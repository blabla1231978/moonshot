import * as express from 'express';
import { URL } from 'url';
import { WhitelistService } from '../services/whitelist.service';
import { container } from '../utils/container.config';

const NOT_AUTHORIZED = 'whiteList not authorized';

async function whitelistMiddlewareHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    let website = '';
    if (req.headers.origin) {
        website = (new URL(req.headers.origin.toString())).hostname;
    }
    const whitelistService = container.get<WhitelistService>('WhitelistService');
    const whiteList = await whitelistService.getWhiteList();
    if (!whiteList.includes(website)) {
        res.status(500).send(NOT_AUTHORIZED);
    }
    next();
}

export { whitelistMiddlewareHandler };
