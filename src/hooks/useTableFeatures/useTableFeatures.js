import {useMemo} from 'react';
import useTableState from '../useTableState';

/**
 *  Hook that exposes table features through the context
 * 
 * @returns {object} Object containing table feature flags
 * 
 * @group Hooks
 */

const useTableFeatures = () => {
    const [tableProps] = useTableState('tableProps');

    const features = useMemo(() => ({
        isExpandable: tableProps?.onCollapse !== undefined,
        isSelectable: tableProps?.onSelect !== undefined,
        selectVariant: tableProps?.selectVariant || 'checkbox',
        variant: tableProps?.variant || 'default',
    }), [tableProps]);

    return features;
};

export default useTableFeatures;