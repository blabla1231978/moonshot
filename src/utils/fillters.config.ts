import * as express from 'express';
import {FiltersDto} from '../dataTransferObjects/filters.dto';

function getFiltersDto(request: express.Request): FiltersDto {
    return {
        website: request.query.website,
        from: request.query.from || null,
        until: request.query.until || null,
        skip: request.query.skip || null,
        limit: request.query.limit || null,
    };
}

export { getFiltersDto };
