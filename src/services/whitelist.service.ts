import { IHandyRedis } from 'handy-redis';
import { inject, injectable } from 'inversify';

@injectable()
export class WhitelistService {

    private whiteListKey: string = 'whitelist';
    @inject('RedisClient') private redisClient: IHandyRedis;

    public async getWhiteList() {
        return await this.redisClient.lrange(this.whiteListKey, 0, -1);
    }
}
