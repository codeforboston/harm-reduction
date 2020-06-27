import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import TableSwitch from './TableSwitch';
import HtmlTable from './HtmlTable';
import SortTable from './SortTable';
import MdbTable from './MdbTable';
import MuiTable from './MuiTable';
import MaterialTable from './MaterialTable';

import { tableTypes } from './TableSwitch';

export const TABLE_TYPES = {
  HTML_TABLE: 0,
  BOOTSTRAP_TABLE: 1,
  MDB_TABLE: 2,
  MUI_TABLE: 3,
  MATERIAL_TABLE: 4,
};

const Table = ({ tableType, ...otherProps }) => {
  switch (tableType) {
    case TABLE_TYPES.BOOTSTRAP_TABLE:
      return <SortTable {...otherProps} />;
    case TABLE_TYPES.MDB_TABLE:
      return <MdbTable {...otherProps} />;
    case TABLE_TYPES.MUI_TABLE:
      return <MuiTable {...otherProps} />;
    case TABLE_TYPES.MATERIAL_TABLE:
      return <MaterialTable {...otherProps} />;
    default:
      return <HtmlTable {...otherProps} />;
  }
};

const TableContainer = props => {
  const [tableType, setTableType] = useState(TABLE_TYPES.HTML_TABLE);
  const { rows } = props;
  return (
    <Container className="table-container">
      <TableSwitch currentTable={tableType} updateTableType={setTableType} />
      {rows.length > 0 ? (
        <div className="data-wrapper">
          <div className="table-header">
            <span className="table-type">
              {tableTypes[tableType].title} Table
            </span>
            <span className="record-count">Showing {rows.length} Records</span>
          </div>
          <Table tableType={tableType} {...props} />
        </div>
      ) : (
        <h2>No Data Currently Available</h2>
      )}
    </Container>
  );
};

TableContainer.propTypes = {
  keyField: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

TableContainer.defaultProps = {
  keyField: 'id',
  columns: [],
  rows: [],
};

export default TableContainer;
