import React from 'react';
import PropTypes from 'prop-types';
// import { SkeletonTable } from '@patternfly/react-component-groups';
import EnhancedSkeletonTable from './EnhancedSkeletonTable';
import { TableToolsContext } from '../../hooks/useTableTools';

const sampleColumns = ['Name', 'Status', 'Location', 'Last Modified'];

export default {
  title: 'TableToolsTable/Enhanced SkeletonTable',
  component: EnhancedSkeletonTable,
  parameters: {
    layout: 'padded',
  },
};

// Test basic PatternFly SkeletonTable first
// export const PatternFlyBasic = {
//   render: () => (
//     <div>
//       <h3>Basic PatternFly SkeletonTable</h3>
//       <SkeletonTable
//         columns={sampleColumns}
//         rowsCount={5}
//       />
//     </div>
//   ),
// };

// Simple test without any complex components
export const SimpleTest = {
  render: () => {
    console.log('SimpleTest rendering...');
    return (
      <div>
        <h3>Simple Test</h3>
        <p>This is a simple test story to verify Storybook is working.</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

// Direct Enhanced SkeletonTable - Basic
export const BasicSkeleton = {
  render: () => (
    <div>
      <h3>Basic Enhanced SkeletonTable</h3>
      <EnhancedSkeletonTable
        columns={sampleColumns}
        rowsCount={8}
        isExpandable={false}
        isSelectable={false}
        variant="default"
      />
    </div>
  ),
};

// Direct Enhanced SkeletonTable - Expandable
export const ExpandableSkeleton = {
  render: () => (
    <div>
      <h3>Expandable Enhanced SkeletonTable</h3>
      <EnhancedSkeletonTable
        columns={sampleColumns}
        rowsCount={8}
        isExpandable={true}
        isSelectable={false}
        variant="default"
      />
    </div>
  ),
};

// Direct Enhanced SkeletonTable - Selectable
export const SelectableSkeleton = {
  render: () => (
    <div>
      <h3>Selectable Enhanced SkeletonTable</h3>
      <EnhancedSkeletonTable
        columns={sampleColumns}
        rowsCount={8}
        isExpandable={false}
        isSelectable={true}
        variant="default"
        selectVariant="checkbox"
      />
    </div>
  ),
};

// Direct Enhanced SkeletonTable - Compact with all features
export const CompactAllFeatures = {
  render: () => (
    <div>
      <h3>Compact Enhanced SkeletonTable (Expandable + Selectable)</h3>
      <EnhancedSkeletonTable
        columns={sampleColumns}
        rowsCount={8}
        isExpandable={true}
        isSelectable={true}
        variant="compact"
        selectVariant="radio"
      />
    </div>
  ),
};

// Demo with TableToolsContext to show feature detection
const ContextDemo = ({ tableProps, title }) => {
  return (
    <TableToolsContext.Provider value={{ tableProps }}>
      <div>
        <h3>{title}</h3>
        <p>
          <strong>Table Props:</strong> {JSON.stringify(tableProps, null, 2)}
        </p>
        <EnhancedSkeletonTable
          columns={sampleColumns}
          rowsCount={6}
          isExpandable={!!tableProps.onCollapse}
          isSelectable={!!tableProps.onSelect}
          variant={tableProps.variant || 'default'}
          selectVariant={tableProps.selectVariant || 'checkbox'}
        />
      </div>
    </TableToolsContext.Provider>
  );
};

ContextDemo.propTypes = {
  tableProps: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export const ContextBasic = {
  render: () => (
    <ContextDemo title="Context Demo - Basic Table" tableProps={{}} />
  ),
};

export const ContextExpandable = {
  render: () => (
    <ContextDemo
      title="Context Demo - Expandable Table"
      tableProps={{ onCollapse: () => {} }}
    />
  ),
};

export const ContextSelectable = {
  render: () => (
    <ContextDemo
      title="Context Demo - Selectable Table"
      tableProps={{ onSelect: () => {} }}
    />
  ),
};

export const ContextCompactAll = {
  render: () => (
    <ContextDemo
      title="Context Demo - Compact with All Features"
      tableProps={{
        onCollapse: () => {},
        onSelect: () => {},
        variant: 'compact',
        selectVariant: 'radio',
      }}
    />
  ),
};
