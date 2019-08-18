import {injectable} from 'inversify';
import { FiltersDto } from '../dataTransferObjects/filters.dto';
import { QueryInterface } from './query.interface';

@injectable()
export class MessageQueryBuilder {

    private query: QueryInterface = {};

    public getMessageQuery(filters: FiltersDto): object {
        if (!this.isFiltersIsEmpty(filters)) {
            this.buildQuery(filters);
        }
        return this.query;
    }

    private isFiltersIsEmpty(filters: FiltersDto): boolean {
        const clearedFilters = this.getClearFiltersObject(filters);
        return Object.keys(clearedFilters).length === 0;
    }

    private getClearFiltersObject(object: object): object {
        const clearedFilters = Object.assign(object);
        for (const [key, value] of Object.entries(clearedFilters)) {
            if (value === undefined || value === null) {
                delete clearedFilters[key];
            }
        }
        return clearedFilters;
    }

    private buildQuery(filters: FiltersDto) {
        this.addWhereSection(filters.website, filters.from, filters.until);
        this.addSkipSection(filters.skip);
        this.addLimitSection(filters.limit);
        return this.query;
    }

    private addWhereSection(domain: string, fromDate: Date, untilDate: Date) {
        this.query.where = {};

        if ( domain && domain.length > 0) {
            this.query.where.$and = [{ domain }];
        }

        if (fromDate || untilDate ) {
            this.query.where.createdAt = {};
        }

        if ( fromDate ) {
            this.query.where.createdAt.$gte = new Date(fromDate);
        }

        if ( untilDate ) {
            this.query.where.createdAt.$lte = new Date(untilDate);
        }
    }

    private addSkipSection(skip: number) {
        if ( skip ) {
            this.query.skip = skip;
        }
    }

    private addLimitSection(limit: number) {
        if ( limit ) {
            this.query.limit = limit;
        }
    }
}
