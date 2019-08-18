import { createHandyClient, IHandyRedis } from 'handy-redis';
import { injectable } from 'inversify';
import { container } from '../utils/container.config';

const redisOptions = {
    host: 'redis',
};

@injectable()
export class RedisModule {

    public async initConnection(): Promise<void> {
        const redisClient = await createHandyClient(redisOptions);
        container.bind<IHandyRedis>('RedisClient').toConstantValue(redisClient);
    }

}
