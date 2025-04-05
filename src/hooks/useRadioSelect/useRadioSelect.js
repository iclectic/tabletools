/**
 * Provides props to enable the Patternfly Table radio select feature
 *
 *  @param   {object}   [options]               TableTools options
 *  @param   {Function} [options.onRadioSelect] A function to call when a row is selected
 *  @param   {number}   [options.total]         The total of items to determine wether or not to show the radio buttons
 *
 *  @returns {object}                           An object of props meant to be used in the {@link TableToolsTable}
 *
 *  @group Hooks
 *
 */
const useRadioSelect = ({ onRadioSelect, total }) => {
  const isRadioSelectEnabled = !!onRadioSelect;
  return isRadioSelectEnabled && total > 0
    ? {
        tableProps: {
          onSelect: onRadioSelect,
          selectVariant: 'radio',
        },
      }
    : {};
};

export default useRadioSelect;
