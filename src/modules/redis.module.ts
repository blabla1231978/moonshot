import { createHandyClient, IHandyRedis } from 'handy-redis';
import { container } from '../utils/container.config';
const redisOptions = {
    host: 'redis',
}

function initRedisConnection(): void {
    const redisClient = createHandyClient(redisOptions);
    container.bind<IHandyRedis>('RedisClient').toConstantValue(redisClient);
}

export { initRedisConnection };
