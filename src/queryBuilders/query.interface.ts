import { WhereSectionInterface } from './where-section.interface';

export interface QueryInterface {
    where?: WhereSectionInterface;
    skip?: number;
    limit?: number;
}
