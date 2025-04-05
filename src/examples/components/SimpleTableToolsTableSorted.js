import React from 'react';

import { TableStateProvider } from '~/components';
import { title, artist } from '~/support/factories/columns';
import { titleOrArtist } from '~/support/factories/filters';

import ExamplesTable from './ExamplesTable';
import useExampleDataQuery from '../hooks/useExampleDataQuery';

const SimpleTableToolsTableSorted = () => {
  const { result: { data, meta: { total } = {} } = {} } = useExampleDataQuery();

  return (
    <ExamplesTable
      items={data}
      columns={[title, artist]}
      filters={{ filterConfig: [titleOrArtist] }}
      total={total}
    />
  );
};

const SimpleTableToolsTableSortedWrapper = (props) => (
  <TableStateProvider>
    <SimpleTableToolsTableSorted {...props} />
  </TableStateProvider>
);

export default SimpleTableToolsTableSortedWrapper;
