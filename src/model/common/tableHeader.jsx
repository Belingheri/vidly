import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { invertSortType } from "../../util/sorter";

import ArrowOrder from "./arrowOrder";

function TableHeader(props) {
  const { columns, sortedColumn, onSort } = props;

  const handleSort = (path) => {
    let newSortedColumn = { ...sortedColumn };
    if (path === newSortedColumn.path)
      newSortedColumn.order = invertSortType(newSortedColumn.order);
    else newSortedColumn = { path, order: "asc" };
    onSort(newSortedColumn);
  };

  return (
    <thead>
      <tr>
        {columns.map((el) => (
          <th
            key={uuidv4()}
            onClick={() => {
              if (el.key) handleSort(el.key);
            }}
          >
            {el.value}
            <ArrowOrder
              order={sortedColumn.path === el.key ? sortedColumn.order : ""}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
