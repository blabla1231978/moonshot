import * as express from 'express';
import { injectable } from 'inversify';
import { URL } from 'url';
import { MessageInterface } from '../interfaces/message.interface';

@injectable()
export class MessageDto {

    public getMessageStructured(request: express.Request): MessageInterface {
        const hostname = (new URL(request.headers.origin.toString())).hostname;
        return  {
            firstName: request.body.firstName || '',
            domain: hostname,
            ...this.getRequestExtraFields(request.body),
            browserInfo: {
                version: request.useragent.version,
                name: request.useragent.browser,
            },
        };
    }

    private getRequestExtraFields(requestBody: object): object {
        const extraFields = Object.assign(requestBody);
        delete extraFields.firstName;
        delete extraFields.firstname;
        return extraFields;
    }
}
