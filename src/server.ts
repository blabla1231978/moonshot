import 'reflect-metadata';
import './controllers/message.controller';
import { MongodbModule } from './modules/mongodb.module';
import { RedisModule } from './modules/redis.module';
import { ServerModule } from './modules/server.module';
import { container } from './utils/container.config';

async function bootstrap() {
    const mongodbModule = container.get<MongodbModule>('MongodbModule');
    const redisModule = container.get<RedisModule>('RedisModule');
    const serverModule = container.get<ServerModule>('ServerModule');
    await mongodbModule.initConnection();
    await redisModule.initConnection();
    serverModule.buildServer();
}
const app = bootstrap();
