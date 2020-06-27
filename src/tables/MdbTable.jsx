import React from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';

/**
 * format metadata for current table
 */
const convertColumn = ({ name, label, sortable = true, display = true }) => ({
  field: name,
  label: name === 'id' ? 'Lookup' : label,
  sort: sortable ? 'asc' : 'disabled',
});

const idFieldBtn = (row, viewUrl) => {
  const { id, ...rest } = row;
  const btn = (
    <MDBBtn color="default" outline size="sm" href={viewUrl(id)}>
      View
    </MDBBtn>
  );
  return { id: btn, ...rest };
};

export default props => {
  const { columns, rows, collectionName } = props;
  const fields = columns.map(col => convertColumn(col));
  const viewUrl = id => `/${collectionName}/show/${id}`;
  const btnRows = rows.map(row => idFieldBtn(row, viewUrl));

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 15, 25]}
      entries={15}
      pagesAmount={4}
      data={{ columns: fields, rows: btnRows }}
    />
  );
};
