import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import TableSwitch from './TableSwitch';
import HtmlTable from './HtmlTable';
import SortTable from './SortTable';
import MdbTable from './MdbTable';
import MuiTable from './MuiTable';

export const TABLE_TYPES = {
  HTML_TABLE: 0,
  BOOTSTRAP_TABLE: 1,
  MDB_TABLE: 2,
  MUI_TABLE: 3,
};

const Table = ({ tableType, ...otherProps }) => {
  switch (tableType) {
    case TABLE_TYPES.BOOTSTRAP_TABLE:
      return <SortTable {...otherProps} />;
    case TABLE_TYPES.MDB_TABLE:
      return <MdbTable {...otherProps} />;
    case TABLE_TYPES.MUI_TABLE:
      return <MuiTable {...otherProps} />;
    default:
      return <HtmlTable {...otherProps} />;
  }
};

const TableContainer = props => {
  const [tableType, setTableType] = useState(TABLE_TYPES.HTML_TABLE);

  return (
    <Container className="table-container">
      <TableSwitch currentTable={tableType} updateTableType={setTableType} />
      <Table tableType={tableType} {...props} />
    </Container>
  );
};

TableContainer.propTypes = {
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default TableContainer;
