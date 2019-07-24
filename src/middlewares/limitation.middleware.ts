import * as express from 'express';
import { WhitelistService } from '../services/whitelist.service';
import { container } from '../utils/container.config';

const NOT_AUTHORIZED = 'not authorized';

async function limitationMiddlewareHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userIp = req.socket.remoteAddress || req.connection.remoteAddress;
    const whitelistService = container.get<WhitelistService>('WhitelistService');
    const isIpExceededTheLimitation = await whitelistService.isIpExceededTheLimitation(userIp);
    if (!isIpExceededTheLimitation) {
        res.status(500).send(NOT_AUTHORIZED);
    } else {
        whitelistService.setRateLimiterForIp(userIp);
        next();
    }
}

export { limitationMiddlewareHandler };
