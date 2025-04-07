---
title: Accessing the table state
group: Documents
category: Guides
---

# Accessing the table state

To allow accessing the table state, like pagination, filters, or sorting and making queries with async hook,
like the `useQuery` hook, the `TableStateProvider` needs to be added.

The above example would than look like this:

```js
import { fetchItems } from 'api';
import { TableToolsTable, TableStateProvider, useRawTableState } from '@bastilian/tabletools';

const columns = [
 {
   title: 'Name',
   renderFunc: (_a, _b, item) => item.name,
 },
];

const Page = () => {
  const tableState = useRawTableState();

  const { data } = useQuery('/api/items', {
    params: {
      page: tableState.pagination.page,
      perPage: tableState.pagination.perPage,
    }
  })

  return (
    <TableToolsTable items={data} columns={columns} />
  );
};

const PageWithTableStateProvider = () =>
  <TableStateProvider>
    <Page />
  </TableStateProvider>

export default PageWithTableStateProvider;
```
