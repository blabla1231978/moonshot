import { IHandyRedis } from 'handy-redis';
import {inject, injectable} from 'inversify';

const RATE_LIMITER_IN_SECONDS = 30;
@injectable()
export class LimitationService {

    @inject('RedisClient') private redisClient: IHandyRedis;

    public async isIpExceededTheLimitation(ip: string): Promise<boolean> {
        return await this.redisClient.get(ip) == null;
    }

    public async setRateLimiterForIp(ip: string) {
        return await this.redisClient.setex(ip, RATE_LIMITER_IN_SECONDS, ip);
    }
}
