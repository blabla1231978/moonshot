import { IHandyRedis } from 'handy-redis';
import { inject, injectable } from 'inversify';

const WHITE_LIST_KEY = 'whitelist';
@injectable()
export class WhitelistService {

    @inject('RedisClient') private redisClient: IHandyRedis;

    public async getWhiteList(): Promise<any[]>{
        return await this.redisClient.lrange(WHITE_LIST_KEY, 0, -1);
    }
}
