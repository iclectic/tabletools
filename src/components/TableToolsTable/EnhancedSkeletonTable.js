import React from 'react';
import PropTypes from 'prop-types';
// import { SkeletonTable } from '@patternfly/react-component-groups';

// Simple skeleton table implementation to avoid PatternFly loading issues
const SimpleSkeletonTable = ({ columns, rowsCount }) => {
  const skeletonRows = Array.from({ length: rowsCount }, (_, i) => (
    <tr key={i}>
      {columns.map((_, colIndex) => (
        <td key={colIndex} style={{ padding: '8px' }}>
          <div
            style={{
              height: '16px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </td>
      ))}
    </tr>
  ));

  return (
    <div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ padding: '12px 8px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonRows}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Enhanced SkeletonTable that supports additional props for better visual matching
 * with the actual table during loading states
 */
const EnhancedSkeletonTable = ({
  rowsCount,
  columns,
  isExpandable,
  isSelectable,
  variant,
  selectVariant, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...otherProps
}) => {
  console.log('EnhancedSkeletonTable props:', { rowsCount, columns, isExpandable, isSelectable, variant });
  // Calculate adjusted columns based on features
  const adjustedColumns = React.useMemo(() => {
    let cols = [...columns];

    // Add selection column if selectable
    if (isSelectable) {
      cols = ['', ...cols]; // Empty string for selection column header
    }

    // Add expand column if expandable
    if (isExpandable) {
      cols = ['', ...cols]; // Empty string for expand column header
    }

    return cols;
  }, [columns, isSelectable, isExpandable]);

  return (
    <SimpleSkeletonTable
      rowsCount={rowsCount}
      columns={adjustedColumns}
      {...otherProps}
    />
  );
};

EnhancedSkeletonTable.propTypes = {
  rowsCount: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.string),
  isExpandable: PropTypes.bool,
  isSelectable: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'compact']),
  selectVariant: PropTypes.oneOf(['checkbox', 'radio']),
};

EnhancedSkeletonTable.defaultProps = {
  rowsCount: 10,
  columns: [],
  isExpandable: false,
  isSelectable: false,
  variant: 'default',
  selectVariant: 'checkbox',
};

export default EnhancedSkeletonTable;
