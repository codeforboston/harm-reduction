import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

/**
 * format metadata for current table
 */
const convertColumn = ({ name, label, sortable = true }) => ({
  field: name,
  label: name === 'id' ? 'ID' : label,
  sort: sortable ? 'asc' : 'disabled',
});

export default props => {
  const { columns, rows } = props;
  const fields = columns.map(col => convertColumn(col));

  // const btnRows = rows.map(row => {
  //   return columns.map(column => {
  //     const val = row[column.name];
  //     if (column.display) {
  //       return val;
  //     } else {
  //       return (
  //         <MDBBtn color="blue-grey" outline size="sm" href={column.link(val)}>
  //           View
  //         </MDBBtn>
  //       );
  //     }
  //   });
  // });

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 15, 25]}
      entries={15}
      pagesAmount={4}
      data={{ columns: fields, rows: rows }}
    />
  );
};
