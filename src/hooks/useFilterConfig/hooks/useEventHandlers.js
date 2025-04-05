import { useCallback } from 'react';

import { toSelectValue } from '../helpers/filterConfigHelpers';
import { toDeselectValue } from '../helpers/filterChipHelpers';

const useEventHandlers = ({
  filters: { filterConfig } = {},
  activeFilters,
  onFilterUpdate: onFilterUpdateCallback,
  onDeleteFilter,
  resetOnClear,
  selectionActions: { select, deselect, reset, clear },
}) => {
  const onFilterUpdate = useCallback(
    (filter, selectedValue, selectedValues) => {
      select(
        ...toSelectValue(filterConfig, filter, selectedValue, selectedValues)
      );
      onFilterUpdateCallback?.();
    },
    [filterConfig, select, onFilterUpdateCallback]
  );

  const onFilterDelete = useCallback(
    async (_event, chips, clearAll = false) => {
      if (clearAll) {
        if (resetOnClear) {
          reset();
        } else {
          clear();
        }
      } else {
        deselect(...toDeselectValue(filterConfig, chips[0], activeFilters));
      }
      onDeleteFilter?.(chips, clearAll);
    },
    [
      filterConfig,
      activeFilters,
      onDeleteFilter,
      reset,
      clear,
      deselect,
      resetOnClear,
    ]
  );

  return { onFilterUpdate, onFilterDelete };
};

export default useEventHandlers;
