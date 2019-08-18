import * as express from 'express';
import {LimitationService} from '../services/limitation.service';
import { container } from '../utils/container.config';

const NOT_AUTHORIZED = 'not authorized';

async function limitationMiddlewareHandler(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const userIp = req.socket.remoteAddress || req.connection.remoteAddress;
    const limitationService = container.get<LimitationService>('LimitationService');
    const isIpExceededTheLimitation = await limitationService.isIpExceededTheLimitation(userIp);
    if (!isIpExceededTheLimitation) {
        res.status(500).send(NOT_AUTHORIZED);
    } else {
        const rateLimiter = await limitationService.setRateLimiterForIp(userIp);
        next();
    }
}

export { limitationMiddlewareHandler };
