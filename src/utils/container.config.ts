import { Container } from 'inversify';
import { Message } from '../entity/message';
import { MessageRepository } from '../repositories/message.repository';
import { LimitationService } from '../services/limitation.service';
import { MessageService } from '../services/message.service';
import { WhitelistService } from '../services/whitelist.service';

const container = new Container();
container.bind<Message>('Message').to(Message);
container.bind<MessageService>('MessageService').to(MessageService);
container.bind<MessageRepository>('MessageRepository').to(MessageRepository);
container.bind<WhitelistService>('WhitelistService').to(WhitelistService);
container.bind<LimitationService>('LimitationService').to(LimitationService);

export {  container  };
