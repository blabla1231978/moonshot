import * as bodyParser from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import {inject, injectable} from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { WhitelistMiddleware } from '../middlewares/whitelist.middleware';
import { container } from '../utils/container.config';

@injectable()
export class ServerModule {

    @inject('WhitelistMiddleware') private whitelistMiddleware: WhitelistMiddleware;

    public buildServer() {
        const server = new InversifyExpressServer(container);
        server.setConfig( app => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(cors());
            app.use(bodyParser.json());
            app.use(this.whitelistMiddleware.handler);
            app.use(useragent.express());
        });
        const app = server.build();
        app.listen(process.env.APP_PORT || 3000);
    }
}
