import { useDeepCompareEffect } from 'use-deep-compare';

import useTableState, {
  useSerialisedTableState,
  useRawTableState,
} from '~/hooks/useTableState';

import { TABLE_STATE_NAMESPACE } from './constants';
import { itemObserver, identifyItems } from './helpers';

/**
 * This hook handles either just returning a provided array of items
 * or calls a provided async (fetch) function to load an array of items
 *
 *  @param   {Array | Function} itemsProp An array or (async) function that returns an array of items to render or an async function to call with the tableState and serialised table state
 *
 *  @returns {Array}                      An array of items from the itemsProp passed in or a return from it as a function
 *
 *                                        TODO it might be good to use this hook as well to "identify" items similar to the `useItemIdentify` hook
 *
 *  @group Hooks
 *
 */
const useItems = (itemsProp, { total: optionsTotal }) => {
  // TODO We should not keep all items in the table state
  // We might use this in some cases, but we can probably accomplish the same without these
  // It might also be bad and cause cycles of the tableState updating and then updating again when items are set
  const [[items, total] = [], setItems] = useTableState('items');
  const [loaded] = useTableState('loaded', false, {
    observers: {
      [TABLE_STATE_NAMESPACE]: itemObserver,
    },
  });
  const tableState = useRawTableState();
  const serialisedTableState = useSerialisedTableState();

  useDeepCompareEffect(() => {
    const setStateFromAsyncItems = async () => {
      if (typeof itemsProp === 'function') {
        const [items, total] = await itemsProp(
          serialisedTableState,
          tableState
        );
        setItems([identifyItems(items), total]);
      } else {
        setItems([identifyItems(itemsProp), optionsTotal]);
      }
    };

    setStateFromAsyncItems();
  }, [setItems, itemsProp, serialisedTableState, tableState, optionsTotal]);

  return {
    loaded,
    items,
    total,
  };
};

export default useItems;
