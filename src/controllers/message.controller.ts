import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { FiltersDto } from '../dataTransferObjects/filters.dto';
import { limitationMiddlewareHandler } from '../middlewares/limitation.middleware';
import { MessageService } from '../services/message.service';
import { getFiltersDto } from '../utils/fillters.config';
import { getMessageObjectDto } from '../utils/mesage-object-dto.config';
import { ResponseInterface } from '../utils/response.interface';

@controller('/message')
export class MessageController {

    private response: ResponseInterface = { err: true, status: 500 };
    @inject('MessageService') private messageService: MessageService;

    @httpGet('/get')
    private async getMessages(request: express.Request, response: express.Response) {
        const filters: FiltersDto = getFiltersDto(request);
        const messages = await this.messageService.getMessages(filters);
        return response.status(messages.status).send(messages);
    }

    @httpPost('/set', limitationMiddlewareHandler)
    private async setMessage(request: express.Request, response: express.Response): Promise<object> {
        if (request.headers.origin) {
            const messageObjectDto = getMessageObjectDto(request);
            const messageObject = await this.messageService.setMessages(messageObjectDto);
            this.response.status = messageObject.status;
            this.response.err = messageObject.err;
            this.response.objectID = messageObject.objectID;
        }
        return response.status(this.response.status).send(this.response);
    }
}
