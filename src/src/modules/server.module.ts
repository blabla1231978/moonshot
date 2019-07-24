import * as bodyParser from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import { InversifyExpressServer } from 'inversify-express-utils';
import { whitelistMiddlewareHandler } from '../middlewares/whitelist.middleware';
import { container } from '../utils/container.config';

function intBuildServer() {
    const server = new InversifyExpressServer(container);
    server.setConfig( app => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(bodyParser.json());
        app.use(whitelistMiddlewareHandler);
        app.use(useragent.express());
    });
    const app = server.build();
    app.listen(process.env.APP_PORT || 3000);
}

export { intBuildServer };
