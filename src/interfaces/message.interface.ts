import { BrowserInfoInterface } from './browserInfo.interface';

export interface MessageInterface {
    firstName: string;
    domain: string;
    browserInfo: BrowserInfoInterface;
    [key: string]: any;
}
