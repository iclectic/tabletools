import React from 'react';

import { TableStateProvider } from '~/components';
import columns from '~/support/factories/columns';
import filters from '~/support/factories/filters';

import ExamplesTable from './ExamplesTable';
import DetailsRow from './DetailsRow';

import useExampleDataQuery from '../hooks/useExampleDataQuery';

const TableToolsTableWithExport = () => {
  const {
    result: { data, meta: { total } = {} } = {},
    exporter,
    itemIdsInTable,
    itemIdsOnPage,
  } = useExampleDataQuery();

  return (
    <ExamplesTable
      items={data}
      columns={columns}
      filters={{ filterConfig: filters }}
      total={total}
      options={{
        manageColumns: true,
        detailsComponent: DetailsRow,
        exporter,
        onSelect: (selected) => {
          console.log('Currently selected', selected);
        },
        itemIdsInTable,
        itemIdsOnPage,
      }}
    />
  );
};

const TableToolsTableWithExportWrapper = (props) => (
  <TableStateProvider>
    <TableToolsTableWithExport {...props} />
  </TableStateProvider>
);

export default TableToolsTableWithExportWrapper;
