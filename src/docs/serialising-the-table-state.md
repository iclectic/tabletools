---
title: Serialising the table state
group: Documents
category: Guides
---

# Serialising the table state

To allow a conversion from the "raw" table state to something consumable for an API "serialisers" can be provided.
A serialiser function is called with the current table state and optionally with configuration parameters and allows returning a modified, "serialised", state.

A serialiser function can be provided in the AsyncTableTools `options` prop for the "pagination", "sort" and "filters"

If we wanted to serialise the pagination state to pass to the API,
our example would need to provide a serialiser and access it via the {@link useSerialisedTableState} hook

```js
import { fetchItems } from 'api';
import { TableToolsTable, TableStateProvider, useSerialisedTableState } from '@bastilian/tabletools';

const columns = [
 {
   title: 'Name',
   renderFunc: (_a, _b, item) => item.name,
 },
];

const paginationSerialiser = ({page, perPage}) =>
  { offset: (page-1) * perPage, limit: perPage }

const Page = () => {
  const serialisedTableState = useSerialisedTableState();

  const { data } = useQuery('/api/items', {
    params: {
      ...serialisedTableState.pagination,
    }
  })

  return (
    <TableToolsTable
      items={data}
      columns={columns}
      options={{
        serialisers: {
          pagination: paginationSerialiser
        }
      }}
    />
  );
};

const PageWithTableStateProvider = () =>
  <TableStateProvider>
    <Page />
  </TableStateProvider>

export default PageWithTableStateProvider;
```

Note that we move from the `useTableState` to the `useSerialisedTableState`.
