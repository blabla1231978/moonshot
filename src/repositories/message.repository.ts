import { injectable } from 'inversify';
import { getRepository, Repository } from 'typeorm';
import { Message } from '../entity/message';

@injectable()
export class MessageRepository {

    private repository: Repository<Message> = getRepository(Message);

    public async setMessage(messageEntity: Message): Promise<Message> {
        return await this.repository.save(messageEntity);
    }

    public async getMessages(query: object): Promise<Message[]> {
        return await this.repository.find(query);
    }
}
