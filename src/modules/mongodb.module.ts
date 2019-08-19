import { injectable } from 'inversify';
import { createConnection, Repository} from 'typeorm';
import { MessageEntity } from '../entity/message.entity';
import { container } from '../utils/container.config';

@injectable()
export class MongodbModule {

    public async initConnection(): Promise<void> {
        const connection = await createConnection();
        const repository: Repository<MessageEntity> = connection.getRepository(MessageEntity);
        container.bind<Repository<MessageEntity>>('MessageEntityRepository').toConstantValue(repository);
    }
}
