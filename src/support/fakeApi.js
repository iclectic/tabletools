import { jsonquery } from '@jsonquerylang/jsonquery';

import itemsFactory from '~/support/factories/items';
import { buildTree } from '~/support/factories/tableTree';
const DEFAULT_LIMIT = 10;
const DEFAULT_ITEM_TOTAL = 2048;

const items = itemsFactory(DEFAULT_ITEM_TOTAL);

const buildQuery = (filters, sort) => {
  const [sortAttribute, sortDirection] = sort?.split(':') || ['id', 'asc'];
  const query = [
    ...(filters ? [`filter(${filters})`] : []),
    ...(sortAttribute && sortDirection
      ? [`sort(.${sortAttribute}, "${sortDirection}")`]
      : []),
  ].join(' | ');
  console.log('JSONQuery:', query);

  return query;
};

/**
 *
 * This function serves as an "API" for examples and tests
 *
 * TODO Add way to simulate network latency to better test loading states
 *
 */
const fakeApi = async ({
  filters,
  sort,
  offset = 0,
  limit = DEFAULT_LIMIT,
} = {}) => {
  console.log('Fake API call with:', { filters, sort, offset, limit });
  const query = buildQuery(filters, sort);
  const queriedItems = query.length ? jsonquery(items, query) : items;
  const actualLimit = limit === 'max' ? items.length : limit;

  const result = {
    data: queriedItems.slice(offset, offset + actualLimit),
    meta: {
      total: queriedItems.length,
    },
  };

  console.log('Fake API result:', result);
  return result;
};

export const fakePlasticTreeApi = async () => buildTree({ items });

export default fakeApi;
