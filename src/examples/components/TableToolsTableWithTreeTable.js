import React from 'react';

import { TableStateProvider } from '~/components';
import columns from '~/support/factories/columns';
import filters from '~/support/factories/filters';
import { fakePlasticTreeApi } from '~/support/fakeApi';
import { useFullTableState } from '~/hooks';

import ExamplesTable from './ExamplesTable';
import DetailsRow from './DetailsRow';

import useExampleDataQuery from '../hooks/useExampleDataQuery';

const TableToolsTableWithExport = () => {
  const { tableState: { tableView } = {} } = useFullTableState() || {};

  const {
    result: { data, meta: { total } = {} } = {},
    exporter,
    itemIdsInTable,
    itemIdsOnPage,
  } = useExampleDataQuery({
    ...(tableView === 'tree'
      ? { params: { limit: 'max', sort: 'id:asc' } }
      : {}),
  });

  const { result: tableTree } = useExampleDataQuery({
    api: fakePlasticTreeApi,
  });

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
        enableTreeView: true,
        defaultTableView: 'tree',
        tableTree,
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
