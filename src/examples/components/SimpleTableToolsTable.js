import React from 'react';

import { TableStateProvider } from '~/components';
import { title, artist } from '~/support/factories/columns';

import ExamplesTable from './ExamplesTable';
import useExampleDataQuery from '../hooks/useExampleDataQuery';

const SimpleTableToolsTable = () => {
  const { result: { data, meta: { total } = {} } = {} } = useExampleDataQuery();

  return (
    <ExamplesTable
      items={data}
      columns={[
        { ...title, sortable: undefined },
        { ...artist, sortable: undefined },
      ]}
      total={total}
    />
  );
};

const SimpleTableToolsTableWrapper = (props) => (
  <TableStateProvider>
    <SimpleTableToolsTable {...props} />
  </TableStateProvider>
);

export default SimpleTableToolsTableWrapper;
