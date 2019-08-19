import {inject, injectable} from 'inversify';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';

@injectable()
export class MessageRepository {

    @inject('MessageEntityRepository') private repository: Repository<MessageEntity>;

    public async setMessage(messageEntity: MessageEntity): Promise<MessageEntity> {
        return await this.repository.save(messageEntity);
    }

    public async getMessages(query: object): Promise<MessageEntity[]> {
        return await this.repository.find(query);
    }
}
