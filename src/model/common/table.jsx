import React from "react";
import PropTypes from "prop-types";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table(props) {
  const { columns, sortedColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
