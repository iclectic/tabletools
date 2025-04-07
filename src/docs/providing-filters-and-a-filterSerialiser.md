---
title: Providing filters and a filterSerialiser
group: Documents
category: Guides
---

# Providing filters and a filterSerialiser

In order to allow selecting filters and passing them on to request data with these filters we need to provide filters,
and provide a serialiser similar to the `paginationSerialiser` function above, but for filters of our imaginary API.

The {@link useFilterConfig} hook used by the {@link TableToolsTable} supports any filter the [ConditionalFilter](https://github.com/RedHatInsights/frontend-components/blob/master/packages/components/doc/conditionalFilter.md) component supports:

 * text
 * checkbox
 * radio
 * group

To add a text filter for the name in our example table, we can provide a `filters` prop as the configuration to the `TableToolsTable`

```js
import { fetchItems } from 'api';
import { TableToolsTable, TableStateProvider, useSerialisedTableState } from '@bastilian/tabletools';

const columns = [
 {
   title: 'Name',
   renderFunc: (_a, _b, item) => item.name,
 },
];

const filters = [
  {
    type: 'text',
    label: 'Name',
  }
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
      filters={filters}
      options={{
        serialisers: {
          pagination: paginationSerialiser,
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

This will give us the UI elements to set a filter and remove it.
To pass it on to the API, we'll add a serialiser function called "filtersSerialiser" and pass it on in the options.

```js
import { fetchItems } from 'api';
import { TableToolsTable, TableStateProvider, useSerialisedTableState } from '@bastilian/tabletools';

const columns = [
 {
   title: 'Name',
   renderFunc: (_a, _b, item) => item.name,
 },
];

const filters = [
  {
    type: 'text',
    label: 'Name',
  }
];

const filtersSerialiser = (filterState) => ({
    filter: Object.entries(filterState).reduce((filterStringParts, [filterId, filterValue]) =>
      `${filterId}=${filterValue}`
    , []).join(' AND ')
  });

const paginationSerialiser = ({page, perPage}) =>
  { offset: (page-1) * perPage, limit: perPage }

const Page = () => {
  const serialisedTableState = useSerialisedTableState();

  const { data } = useQuery('/api/items', {
    params: {
      ...serialisedTableState.pagination,
      ...serialisedTableState.filters
    }
  })

  return (
    <TableToolsTable
      items={data}
      columns={columns}
      filters={filters}
      options={{
        serialisers: {
          pagination: paginationSerialiser,
          filters: filtersSerialiser,
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

In our example the `filtersSerialiser` is taking the `filterState` it is passed and
transforms it into a string to pass on as the `filter` parameter for our magic API.
Our `filtersSerialiser` only uses the first parameter, but the function is also called
with the filter configuration passed in for the table to construct a filter for an API.
