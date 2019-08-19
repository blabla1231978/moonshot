import * as express from 'express';
import { injectable } from 'inversify';
import { URL } from 'url';
import { WhitelistService } from '../services/whitelist.service';
import { container } from '../utils/container.config';

const NOT_AUTHORIZED = 'whiteList not authorized asd';

@injectable()
export class WhitelistMiddleware {

    public async handler(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        let website = '';
        if (req.headers.origin) {
            website = (new URL(req.headers.origin.toString())).hostname;
        }
        const whitelistService = container.get<WhitelistService>('WhitelistService');
        const whiteList = await whitelistService.getWhiteList();
        if (!whiteList.includes(website)) {
            res.status(500).send('NOT_AUTHORIZED / whitelist ' + whiteList.toString() + ' website ' + website);
        } else {
            next();
        }
    }
}
