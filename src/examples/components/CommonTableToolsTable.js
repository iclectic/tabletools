import React from 'react';

import { TableStateProvider } from '~/components';
import columns from '~/support/factories/columns';
import filters from '~/support/factories/filters';

import ExamplesTable from './ExamplesTable';
import useExampleDataQuery from '../hooks/useExampleDataQuery';

const CommonTableToolsTable = () => {
  const { result: { data, meta: { total } = {} } = {} } = useExampleDataQuery();

  return (
    <ExamplesTable
      items={data}
      columns={columns}
      filters={{ filterConfig: filters }}
      total={total}
      options={{
        manageColumns: true,
      }}
    />
  );
};

const CommonTableToolsTableWrapper = (props) => (
  <TableStateProvider>
    <CommonTableToolsTable {...props} />
  </TableStateProvider>
);

export default CommonTableToolsTableWrapper;
