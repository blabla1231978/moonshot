import {injectable} from 'inversify';
import { FiltersDto } from '../dataTransferObjects/filters.dto';
import { QueryInterface } from './query.interface';
import {AndSectionInterface} from "./and-section.interface";

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
        return Object.keys(clearedFilters).length > 0;
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

    private addWhereSection(domain: string, from: Date, until: Date) {
        const and = [];

        if ( domain && domain.length > 0) {
            and.push({ domain });
        }

        if ( and.length ) {
            this.query.where.$and = and;
        }

        (from) && (this.query.where.createdAt.$gte = new Date(from));
        (until) && (this.query.where.createdAt.$lte = new Date(until));
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
