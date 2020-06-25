import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './tables.css';

/**
 * Component takes data in the form:
 * [{ dataField: 'id', text: 'ID', sort: bool }]
 */
const convertColumn = ({
  fieldName,
  labelName,
  isKey = false,
  sortable = true,
  display = true,
}) => ({
  dataField: fieldName,
  text: labelName,
  sort: sortable,
  hidden: !display,
});

const transformFields = fields => fields.map(field => convertColumn(field));

const findKeyField = fields => fields.find(field => field.isKey).fieldName;

// table has problems with long fields
const SortTable = ({ fields, rows }) => {
  const columns = transformFields(fields);
  return (
    <BootstrapTable
      keyField={findKeyField(fields)}
      columns={columns}
      data={rows}
      pagination={paginationFactory()}
      striped
      hover
      condensed
      headerClasses="bst-head"
      rowClasses="bst-row"
      noDataIndication="Table is Empty"
    />
  );
};

export default SortTable;
