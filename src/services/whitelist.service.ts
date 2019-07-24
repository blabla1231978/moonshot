import {IHandyRedis} from 'handy-redis';
import {inject, injectable} from 'inversify';

@injectable()
export class WhitelistService {

    private whiteListKey: string = 'whitelist';
    @inject('RedisClient') private redisClient: IHandyRedis

    public async getWhiteList() {
        return await this.redisClient.lrange(this.whiteListKey, 0, -1);
    }

    public async setRateLimiterForIp(ip: string) {
        return await this.redisClient.setex(ip, 30, ip);
    }

    public async isIpExceededTheLimitation(ip: string): Promise<boolean> {
        return await this.redisClient.get(ip) == null;
    }
}
