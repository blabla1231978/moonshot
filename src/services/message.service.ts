import { inject, injectable } from 'inversify';
import { ObjectID } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';
import { FiltersInterface } from '../interfaces/filters.interface';
import { MessageInterface } from '../interfaces/message.interface';
import { ResponseInterface } from '../interfaces/response.interface';
import { MessageQueryBuilder } from '../queryBuilders/message.queryBuilder';
import { MessageRepository } from '../repositories/message.repository';

@injectable()
export class MessageService {

    private response: ResponseInterface = { err: true, status: 500 };
    @inject('MessageRepository') private messageRepository: MessageRepository;
    @inject('MessageQueryBuilder') private messageQueryBuilder: MessageQueryBuilder;
    @inject('MessageEntity') private messageEntity: MessageEntity;

    public async getMessages(filters: FiltersInterface): Promise<ResponseInterface> {
        const query = this.messageQueryBuilder.getMessageQuery(filters);
        const messages = await this.messageRepository.getMessages(query);
        (messages.length) && this.setSuccessGetMessagesResponse(filters.website, messages);
        return this.response;
    }

    public async setMessages(messageStructure: MessageInterface): Promise<ResponseInterface> {
        this.messageEntity.setMessageEntity(messageStructure);
        const messageCollection = await this.messageRepository.setMessage(this.messageEntity);
        this.setSuccessSetMessageResponse(messageCollection.id);
        return this.response;
    }

    private setSuccessGetMessagesResponse(website: string, messages: MessageEntity[]): void {
        const responseKey = website && website.length > 0 ? website : 'messages';
        this.response[responseKey] = messages;
        this.response.status = 200;
        this.response.err = false;
    }

    private setSuccessSetMessageResponse(objectID: ObjectID): void {
        this.response.objectID = objectID;
        this.response.status = 200;
        this.response.err = false;
    }
}
