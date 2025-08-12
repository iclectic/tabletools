import { renderHook } from '@testing-library/react';
import {DEFAULT_RENDER_OPTIONS} from '~/support/testHelpers';
import useTableFeatures from './useTableFeatures';

jest,mick('../useTableState', () => ({
    __esModule: true,
    default: jest.fn(),
}));

import useTableState from '../useTableState';

describe('useTableFeatures', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns default values when tableProps is undefined', () => {
     useTableState.mockReturnValue([undefined]);
     const { result } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);
     
     expect(result.current).toEqual({
        isExpandable: false,
        isSelectable: false,
        selectVariant: 'checkbox',
        variant: 'default',
     });
});

    it('returns default values when tableProps is empty', () => {
        useTableState.mockReturnValue([{}]);

        const {result } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);
        
        expect(result.current).toEqual({
            isExpandable: false,
            
            isSelectable: false,
            selectVariant: 'checkbox',
            variant: 'default',
        });
    });

    it('detects expandable table when onCollapse is present', () => {
        const mockTableProps = {
            onCollapse: jest.fn(),
        };
        useTableState.mockReturnValue([mockTableProps]);

        const { result } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);

        expect(result.current.isExpandable).toBe(true);
    });

    it('detects selectable table when onSelect is present', () => {
        const mockTableProps = {
            onSelect: jest.fn(),
        };
        useTableState.mockReturnValue([mockTableProps]);

        const { result } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);

        expect(result.current.isSelectable).toBe(true);

    });

    it('returns the correct variant when specified', () => {
        const mockTableProps = {
            variant: 'compact',
        }; 
        useTableState.mockReturnValue([mockTableProps]);

        const { result } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);

        expect(result.current.variant).toBe('compact');
    });

    it('returns the correct selectVariant when specified', () => {
        const mockTableProps = {
            selectVariant: 'radio',
        };
        useTableState.mockReturnValue([mockTableProps]);

        const {result} = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);


        expect(result.current.selectVariant).toBe('radio');
    });

    it('returns all features when all props are present', () => {
        const mockTableProps = {
            onCollapse: jest.fn(),
            onSelect: jest.fn(),
            variant: 'compact',
            selectVariant: 'radio',
        };
        useTableState.mockReturnValue([mockTableProps]);

        const {result} = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);

        expect(result.current).toEqual({
            isExpandable: true,
            isSelectable: true,
            selectVariant: 'radio',
            variant: 'compact',
        });
    });

    it('memoizes the result when tableProps do not change', () => {
        const mockTableProps = {
            onCollapse: jest.fn(),
            variant: 'compact',
        };
        useTableState.mockReturnValue([mockTableProps]);

        const {result, rerender } = renderHook(() => useTableFeatures(), DEFAULT_RENDER_OPTIONS);
        const firstResult = result.current;

        rerender();
        const secondResult = result.current;

        expect(firstResult).toBe(secondResult);
    });
});
