import { AndSectionInterface } from './and-section.interface';
import { CreatedAtInterface } from './created-at.interface';

export interface WhereSectionInterface {
    $and?: object[];
    createdAt?: CreatedAtInterface;
}
