import React from 'react';
import propTypes from 'prop-types';

import { TableToolsTable } from '~/components';

import paginationSerialiser from './helpers/serialisers/pagination';
import sortSerialiser from './helpers/serialisers/sort';
import filtersSerialiser from './helpers/serialisers/filters';

const ExamplesTable = ({ options, ...props }) => (
  <TableToolsTable
    options={{
      ...options,
      serialisers: {
        pagination: paginationSerialiser,
        sort: sortSerialiser,
        filters: filtersSerialiser,
      },
    }}
    {...props}
  />
);

ExamplesTable.propTypes = {
  options: propTypes.object,
};

export default ExamplesTable;
