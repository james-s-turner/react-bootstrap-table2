/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './header-cell';
import SelectionHeaderCell from './row-selection/selection-header-cell';
import ExpandHeaderCell from './row-expand/expand-header-cell';
import withHeaderSelection from './row-selection/selection-header-cell-consumer';
import withHeaderExpansion from './row-expand/expand-header-cell-consumer';
import Const from './const';

const Header = (props) => {
  const {
    className,
    columns,
    onSort,
    onFilter,
    sortField,
    sortOrder,
    selectRow,
    onExternalFilter,
    expandRow,
    preHeaderRows,
    postHeaderRows
  } = props;

  let SelectionHeaderCellComp = () => null;
  let ExpansionHeaderCellComp = () => null;

  if (expandRow.showExpandColumn) {
    ExpansionHeaderCellComp = withHeaderExpansion(ExpandHeaderCell);
  }

  if (selectRow) {
    SelectionHeaderCellComp = withHeaderSelection(SelectionHeaderCell);
  }

  const isRenderFunctionColumnInLeft = (
    position = Const.INDICATOR_POSITION_LEFT
  ) => position === Const.INDICATOR_POSITION_LEFT;

  const childrens = [
    columns.map((column, i) => {
      const currSort = column.dataField === sortField;
      const isLastSorting = column.dataField === sortField;
      return (
        <HeaderCell
          index={ i }
          key={ column.dataField }
          column={ column }
          onSort={ onSort }
          sorting={ currSort }
          onFilter={ onFilter }
          onExternalFilter={ onExternalFilter }
          sortOrder={ sortOrder }
          isLastSorting={ isLastSorting }
        />);
    })
  ];

  if (!selectRow.hideSelectColumn) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift(<SelectionHeaderCellComp key="selection" />);
    } else {
      childrens.push(<SelectionHeaderCellComp key="selection" />);
    }
  }

  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift(<ExpansionHeaderCellComp key="expansion" />);
    } else {
      childrens.push(<ExpansionHeaderCellComp key="expansion" />);
    }
  }

  return (
    <thead>
      {preHeaderRows}
      <tr className={ className }>
        { childrens }
      </tr>
      {postHeaderRows}
    </thead>
  );
};

function PreHeaders() {
  return null;
}

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  selectRow: PropTypes.object,
  onExternalFilter: PropTypes.func,
  className: PropTypes.string,
  expandRow: PropTypes.object,
  preHeaderRows: PropTypes.array,
  postHeaderRows: PropTypes.array
};

export default Header;
