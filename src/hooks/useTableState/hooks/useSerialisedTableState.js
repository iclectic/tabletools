import { useContext } from 'react';

import { TableContext } from '../constants';

/**
 * Hook to access the serialised table state
 *
 *  @returns {object} serialised table state
 *
 *  @group Hooks
 *
 */
const useSerialisedTableState = () => {
  const context = useContext(TableContext);

  return context?.state?.[0]?.serialisedTableState;
};

export default useSerialisedTableState;
