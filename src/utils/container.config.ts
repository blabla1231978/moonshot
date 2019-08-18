import { Container } from 'inversify';
import { Message } from '../entity/message';
import { WhitelistMiddleware } from '../middlewares/whitelist.middleware';
import { MongodbModule } from '../modules/mongodb.module';
import { RedisModule } from '../modules/redis.module';
import { ServerModule } from '../modules/server.module';
import { MessageRepository } from '../repositories/message.repository';
import { LimitationService } from '../services/limitation.service';
import { MessageService } from '../services/message.service';
import { WhitelistService } from '../services/whitelist.service';

const container = new Container();
container.bind<Message>('Message').to(Message);
container.bind<MessageService>('MessageService').to(MessageService);
container.bind<MessageRepository>('MessageRepository').to(MessageRepository);
container.bind<WhitelistService>('WhitelistService').to(WhitelistService);
container.bind<LimitationService>('LimitationService').to(LimitationService);
container.bind<MongodbModule>('MongodbModule').to(MongodbModule);
container.bind<RedisModule>('RedisModule').to(RedisModule);
container.bind<ServerModule>('ServerModule').to(ServerModule);
container.bind<WhitelistMiddleware>('WhitelistMiddleware').to(WhitelistMiddleware);

export { container };
