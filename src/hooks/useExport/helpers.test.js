import items from '~/support/factories/items';
import columns from '~/support/factories/columns';

import { csvForItems, exportableColumns, jsonForItems } from './helpers';

const exampleItems = items(25);
const filteredColumns = exportableColumns(columns);

describe.skip('jsonForItems', () => {
  it('returns an json export of items', () => {
    const result = jsonForItems({
      columns: filteredColumns,
      items: exampleItems,
    });

    expect(result).toMatchSnapshot();
  });
});

describe.skip('csvForItems', () => {
  it('returns an csv export of items', () => {
    const result = csvForItems({
      columns: filteredColumns,
      items: exampleItems,
    });

    expect(result).toMatchSnapshot();
  });
});
