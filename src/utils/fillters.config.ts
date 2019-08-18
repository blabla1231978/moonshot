import * as express from 'express';
import { URL } from 'url';
import { FiltersDto } from '../dataTransferObjects/filters.dto';

function getFiltersDto(request: express.Request): FiltersDto {
    const hostname = (new URL(request.headers.origin.toString())).hostname;
    return {
        website: hostname,
        from: request.query.from || null,
        until: request.query.until || null,
        skip: request.query.skip || null,
        limit: request.query.limit || null,
    };
}

export { getFiltersDto };
