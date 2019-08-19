import * as bodyParser from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import { injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '../utils/container.config';

@injectable()
export class ServerModule {

    public buildServer() {
        const server = new InversifyExpressServer(container);
        server.setConfig( app => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(cors());
            app.use(bodyParser.json());
            app.use(useragent.express());
        });
        const app = server.build();
        app.listen(process.env.APP_PORT || 3000);
    }
}
