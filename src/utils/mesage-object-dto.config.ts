import * as express from 'express';
import { URL } from 'url';
import {MessageObjectDto} from '../dataTransferObjects/message-object.dto';

function getMessageObjectDto(request: express.Request): MessageObjectDto {
    const hostname = (new URL(request.headers.origin.toString())).hostname;
    return  {
        firstName: request.body.firstname || '',
        domain: hostname,
        browserInfo: {
            version: request.useragent.version,
            name: request.useragent.browser,
        },
    };
}

export { getMessageObjectDto };
