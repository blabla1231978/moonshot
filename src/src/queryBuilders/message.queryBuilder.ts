import { FiltersDto } from '../dataTransferObjects/filters.dto';

function getMessageQuery(filters: FiltersDto): object {
    return {
        where: {
            $and: [
                {
                    domain: filters.website,
                },
                {
                    createdAt: {
                        $gte: new Date(filters.from),
                        $lte: new Date(filters.until),
                    },
                },
            ],
        },
        skip: parseInt(filters.skip),
        take: parseInt(filters.limit),
    };
}
export { getMessageQuery };
