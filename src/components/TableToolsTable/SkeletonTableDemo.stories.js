import React, {useState} from 'react';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Button } from '@patternfly/react-core';
import defaultStoryMeta from '~/support/defaultStoryMeta';
import columns from '~/support/factories/columns';
import filters from '~/support/factories/filters';
import { TableToolsTable, TableStateProvider} from '~/components';
import {useTableFeatures} from '~/hooks';

const queryClient = newQueryClient();

const meta = {
    title: 'TableToolsTable/SkeletonTable Demo',
    component: TableToolsTable,
    ...defaultStoryMeta,
};

//  Component to demonstrate useTableFeatures hook
const TableFeaturesDisplay = () => {
    const features = useTableFeatures();

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            marginBottom: '16px',
            borderRadius: '4px'
         }}>
            <h4>Current Table Features (via useTableFeatures hook):</h4>
            <ul>
                <li>Is Expandable: {features.isExpandable ? 'Yes' : 'No'}</li>
                <li>Is Selectable: {features.isSelectable ? 'Yes' : 'No'}</li>
                <li>Variant: {features.variant}</li>
                <li>Select Variant: {features.selectVariant}</li>
            </ul>
        </div>
    );

};

const SkeletonTableDemoExample = ({
    enableBulkSelect,
    enableDetails, 
    variant,
    selectVariant
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    const toggleLoading = () => {
        if (isLoading) {
            // Simulate loading data
            setItems([
                {id: 1, name: 'Item 1', status: 'Active'},
                { id: 2, name: 'Item 2', status: 'Inactive'},
                { id: 3, name: 'Item 3', status: 'Active'},
            ]);
            setIsLoading(false);
        } else {
            setItems([]);
            setIsLoading(true);
        }
    };
    
    const tableColumns = [
        { title: 'Name', key: 'name'},
        { title: 'Status', key: 'status'},
    ];

    return (
        <QueryClientProvider client={queryClient}>
            <TableStateProvider>
                <div style={{padding: '20px'}}>
                    <div style={{ marginBottom: '20px' }}>
                        <Button onClick={toggleLoading} variant="primary">
                            {isLoading ? 'Load Data' : 'Show Loading State'}
                        </Button>
                    </div>   
                    <TableFeaturesDisplay />
                    <TableToolsTable
                     loading={isLoading}
                     items={items}
                     columns={tableColumns}
                     options={{
                        bulkSelect: enableBulkSelect ? {
                            onSelect: (selected) => console.log('Selected:', selected),
                            selectVariant,
                        } : undefined,
                        details: enableDetails ? {
                            component: ({ item }) => <div>Details for {item.name}</div>,
                        } : undefined,
                        variant,
                     }}
                    />
                </div>
            </TableStateProvider>
        </QueryClientProvider>
    );
};

export const BasicSkeletonTable = {
    args: {
        enableBulkSelect: false,
        enableDetails: false,
        variant: 'default',
        selectVariant: 'checkbox',
    },
    render: (args) => <SkeletonTableDemoExample {...args} />,
};

export const ExpandableSkeletonTable = {
    args: {
        enableBulkSelect: false,
        enableDetails: true,
        variant: 'default',
        selectVariant: 'checkbox',
    },
    render: (args) => <SkeletonTableDemoExample {...args} />,
};

export const SelectableSkeletonTable = {
    args: {
        enableBulkSelect: true,
        enableDetails: false,
        variant: 'default',
        selectVariant: 'checkbox',
    },
    render: (args) => <SkeletonTableDemoExample {...args} />,
};

export const SelectableRadioSkeletonTable = {
    args: {
        enableBucketSelect: true,
        enableDetails: false,
        variant: 'default',
        selectVariant: 'radio',
    },
    render: (args) => <SkeletonTableDemoExample {...args} />,
};

export const CompactExpandableSelectableSkeletonTable = {
    args: {
        enableBulkSelect: true,
        enableDetails: true,
        variant: 'compact',
        selectVariant: 'checkbox',
    },
    render: (args) => <SkeletonTableDemoExample {...args} />,
};

export default meta;