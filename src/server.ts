import 'reflect-metadata';
import './controllers/message.controller';
import { initMongoConnection } from './modules/mongodb.module';
import { initRedisConnection } from './modules/redis.module';
import { intBuildServer } from './modules/server.module';

async function bootstrap() {
    await initMongoConnection();
    initRedisConnection();
    intBuildServer();
}
bootstrap();
