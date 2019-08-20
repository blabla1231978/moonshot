import * as express from 'express';
import { injectable } from 'inversify';
import { FiltersInterface } from '../interfaces/filters.interface';

@injectable()
export class FiltersDto {

    public getFiltersStructured(request: express.Request): FiltersInterface {
        return {
            website: request.query.website,
            from: request.query.from || null,
            until: request.query.until || null,
            skip: parseInt(request.query.skip, 0) || null,
            limit: parseInt(request.query.limit, 0) || null,
        };
    }
}
