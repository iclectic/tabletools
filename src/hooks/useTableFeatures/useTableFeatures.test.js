import React from 'react';
import { renderHook } from '@testing-library/react';
import { DEFAULT_RENDER_OPTIONS } from '~/support/testHelpers';
import useTableFeatures from './useTableFeatures';
import { TableToolsContext } from '../useTableTools';

const mockContext = {
  tableProps: {
    onCollapse: jest.fn(),
    onSelect: jest.fn(),
    variant: 'compact',
    selectVariant: 'radio',
  },
};

const wrapper = ({ children }) => (
  <TableToolsContext.Provider value={mockContext}>
    {children}
  </TableToolsContext.Provider>
);

describe('useTableFeatures', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns default values when used outside context', () => {
    const { result } = renderHook(
      () => useTableFeatures(),
      DEFAULT_RENDER_OPTIONS,
    );

    expect(result.current).toEqual({
      isExpandable: false,
      isSelectable: false,
      selectVariant: 'checkbox',
      variant: 'default',
    });
  });

  it('returns feature flags from context', () => {
    const { result } = renderHook(() => useTableFeatures(), { wrapper });

    expect(result.current).toEqual({
      isExpandable: true,
      isSelectable: true,
      selectVariant: 'radio',
      variant: 'compact',
    });
  });

  it('memoizes results for performance', () => {
    const { result, rerender } = renderHook(() => useTableFeatures(), {
      wrapper,
    });
    const firstResult = result.current;

    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });
});
