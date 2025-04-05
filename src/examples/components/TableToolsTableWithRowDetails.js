import React from 'react';

import { TableStateProvider } from '~/components';
import columns from '~/support/factories/columns';
import filters from '~/support/factories/filters';

import ExamplesTable from './ExamplesTable';
import DetailsRow from './DetailsRow';

import useExampleDataQuery from '../hooks/useExampleDataQuery';

const TableToolsTableWithRowDetails = () => {
  const { result: { data, meta: { total } = {} } = {} } = useExampleDataQuery();

  return (
    <ExamplesTable
      items={data}
      columns={columns}
      filters={{ filterConfig: filters }}
      total={total}
      options={{
        manageColumns: true,
        detailsComponent: DetailsRow,
      }}
    />
  );
};

const TableToolsTableWithRowDetailsWrapper = (props) => (
  <TableStateProvider>
    <TableToolsTableWithRowDetails {...props} />
  </TableStateProvider>
);

export default TableToolsTableWithRowDetailsWrapper;
