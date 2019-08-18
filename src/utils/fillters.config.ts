import * as express from 'express';
import {FiltersDto} from '../dataTransferObjects/filters.dto';

function getFiltersDto(request: express.Request): FiltersDto {
    return {
        website: request.query.website,
        from: request.query.from || null,
        until: request.query.until || null,
        skip: parseInt(request.query.skip) || null,
        limit: parseInt(request.query.limit) || null,
    };
}

export { getFiltersDto };
