import { injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';

@injectable()
export class MongodbModule {

    public async initConnection(): Promise<void> {
        const connection = await createConnection();
    }
}
