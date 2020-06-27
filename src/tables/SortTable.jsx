import React from 'react';
// import Button from 'react-bootstrap/Button';
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
  name,
  label,
  type = 'string',
  sortable = true,
  display = true,
}) => ({
  dataField: name,
  text: label,
  sort: sortable,
  hidden: !display,
});

// const linkButton = (column, rows) => {
//   if (column.type === 'link') {
//     return rows.map(row => {
//       const field = row[column.name];
//       const url = column.link(field);
//       row[column.name] = (
//         <Button href={url} variant="primary">
//           View
//         </Button>
//       );
//       return row;
//     });
//   }
//   return rows;
// };

// !underlying component uses deprecated methods!
export default ({ columns, rows }) => {
  const fields = columns.map(col => convertColumn(col));
  return (
    <BootstrapTable
      keyField="id"
      columns={fields}
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
