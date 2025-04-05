import filters from '~/support/factories/filters';

import { toDeselectValue, toFilterChips } from './filterChipHelpers';

describe('toFilterChips', () => {
  it('returns filterchips for active filters', () => {
    const filterChips = toFilterChips(filters, {
      title: ['TEST NAME'],
    });
    expect(filterChips[0].chips[0].name).toEqual('TEST NAME');
  });
});

describe('toDeselectValue', () => {
  it('should return a value to pass as action to the seleciton manager', () => {
    expect(
      toDeselectValue(filters, {
        category: 'Title',
        chips: [
          {
            name: 'TEST NAME',
          },
        ],
      })
    ).toEqual(['TEST NAME', 'title']);
  });
});
