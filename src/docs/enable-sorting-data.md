---
title: Enable sorting data
group: Documents
category: Guides
---

# Enable sorting data

To enable the sorting on columns, they need to have a `sortable` property:

```js
import { fetchItems } from 'api';
import { TableToolsTable, TableStateProvider, useSerialisedTableState } from '@bastilian/tabletools';

const columns = [
 {
   title: 'Name',
   renderFunc: (_a, _b, item) => item.name,
   sortable: 'name'
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

const sortSerialiser = ({ index, direction }, columns) =>
   `${columns[index].sortable}:${direction}`;

const Page = () => {
  const serialisedTableState = useSerialisedTableState();

  const { data } = useQuery('/api/items', {
    params: {
      ...serialisedTableState.pagination,
      ...serialisedTableState.filters,
      sort_by: serialisedTableState.sort
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
          sort: sortSerialiser
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

This will add the Patternfly "sortable" `Table` transform and add a table state when columns are clicked.
In our example the "sortable" prop is a string, which we use to define the attribute the item is sortable by in our awesome API.
But the "sortable" property can be anything, even just a boolean.


With this we should now have a fully functioning table that allows to show, filterable, sortable and paginated data from an API.
