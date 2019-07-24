import { inject, injectable } from 'inversify';
import { ObjectID } from 'typeorm';
import { FiltersDto } from '../dataTransferObjects/filters.dto';
import { MessageObjectDto } from '../dataTransferObjects/message-object.dto';
import { Message } from '../entity/message';
import { getMessageQuery } from '../queryBuilders/message.queryBuilder';
import { MessageRepository } from '../repositories/message.repository';
import { container } from '../utils/container.config';
import { ResponseInterface } from '../utils/response.interface';

@injectable()
export class MessageService {

    private response: ResponseInterface = { err: true, status: 500 };
    @inject('MessageRepository') private messageRepository: MessageRepository;

    public async getMessages(filters: FiltersDto): Promise<ResponseInterface> {
        const query = getMessageQuery(filters);
        const messages = await this.messageRepository.getMessages(query);
        (messages.length) && this.setSuccessGetMessagesResponse(filters.website, messages);
        return this.response;
    }

    public async setMessages(messageObjectDto: MessageObjectDto): Promise<ResponseInterface> {
        const messageEntity = container.get<Message>('Message');
        messageEntity.setMessageEntity(messageObjectDto);
        const messageObject = await this.messageRepository.setMessage(messageEntity);
        this.setSuccessSetMessageResponse(messageObject.id);
        return this.response;
    }

    private setSuccessGetMessagesResponse(website: string, messages: Message[]): void {
        this.response[website] = messages;
        this.response.status = 200;
        this.response.err = false;
    }

    private setSuccessSetMessageResponse(objectID: ObjectID): void {
        this.response.objectID = objectID;
        this.response.status = 200;
        this.response.err = false;
    }
}
