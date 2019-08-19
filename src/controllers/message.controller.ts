import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { FiltersDto } from '../dataTransferObjects/filters.dto';
import { MessageDto } from '../dataTransferObjects/mesage.dto';
import { FiltersInterface } from '../interfaces/filters.interface';
import { ResponseInterface } from '../interfaces/response.interface';
import { LimitationMiddleware } from '../middlewares/limitation.middleware';
import { WhitelistMiddleware } from '../middlewares/whitelist.middleware';
import { MessageService } from '../services/message.service';
import { container } from '../utils/container.config';

const whitelistMiddleware = container.get<WhitelistMiddleware>('WhitelistMiddleware');
const limitationMiddleware = container.get<LimitationMiddleware>('LimitationMiddleware');

@controller('/message', whitelistMiddleware.handler)
export class MessageController {

    private response: ResponseInterface = { err: true, status: 500 };
    @inject('MessageService') private messageService: MessageService;
    @inject('FiltersDto') private filtersDto: FiltersDto;
    @inject('MessageDto') private messageDto: MessageDto;

    @httpGet('/get')
    private async getMessages(request: express.Request, response: express.Response) {
        const filters: FiltersInterface = this.filtersDto.getFiltersStructured(request);
        const messages = await this.messageService.getMessages(filters);
        return response.status(messages.status).send(messages);
    }

    @httpPost('/set', limitationMiddleware.handler)
    private async setMessage(request: express.Request, response: express.Response): Promise<object> {
        if (request.headers.origin) {
            const messageStructure = this.messageDto.getMessageStructured(request);
            const messageCollection = await this.messageService.setMessages(messageStructure);
            this.response.status = messageCollection.status;
            this.response.err = messageCollection.err;
            this.response.objectID = messageCollection.objectID;
        }
        return response.status(this.response.status).send(this.response);
    }
}
