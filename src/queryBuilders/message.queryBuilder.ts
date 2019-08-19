import {injectable} from 'inversify';
import { FiltersInterface } from '../interfaces/filters.interface';
import { QueryInterface } from '../interfaces/query/query.interface';

@injectable()
export class MessageQueryBuilder {

    private query: QueryInterface = {};

    public getMessageQuery(filters: FiltersInterface): object {
        if (!this.isFiltersIsEmpty(filters)) {
            this.buildQuery(filters);
        }
        return this.query;
    }

    private isFiltersIsEmpty(filters: FiltersInterface): boolean {
        const clearedFilters = this.getClearObject(filters);
        return Object.keys(clearedFilters).length === 0;
    }

    private getClearObject(object: object): object {
        const clearedFilters = Object.assign(object);
        for (const [key, value] of Object.entries(clearedFilters)) {
            if (value === undefined || value === null) {
                delete clearedFilters[key];
            }
        }
        return clearedFilters;
    }

    private buildQuery(filters: FiltersInterface) {
        this.addWhereSection(filters.website, filters.from, filters.until);
        this.addSkipSection(filters.skip);
        this.addLimitSection(filters.limit);
        return this.query;
    }

    private addWhereSection(domain: string, fromDate: Date, untilDate: Date) {
        this.query.where = {};

        if ( domain && domain.length > 0) {
            this.query.where.$and = [
                { 'messageStructure.domain': domain },
            ];
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
