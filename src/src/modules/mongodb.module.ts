import {createConnection} from 'typeorm';

async function initMongoConnection() {
    await createConnection();
}

export { initMongoConnection };
