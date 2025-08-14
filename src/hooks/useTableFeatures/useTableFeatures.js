import { useMemo, useContext } from 'react';
import { TableToolsContext } from '../useTableTools';

/**
 * Hook to access table feature flags from the current table context
 * Provides information about table capabilities like expandable rows, selectable rows, etc.
 */
export const useTableFeatures = () => {
  const context = useContext(TableToolsContext);
  const { tableProps } = context || {};

  return useMemo(
    () => ({
      isExpandable: tableProps?.onCollapse !== undefined,
      isSelectable: tableProps?.onSelect !== undefined,
      selectVariant: tableProps?.selectVariant || 'checkbox',
      variant: tableProps?.variant || 'default',
    }),
    [tableProps],
  );
};

export default useTableFeatures;
