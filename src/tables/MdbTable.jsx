import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdbreact';

/**
 * format metadata for current table
 */
const convertColumn = ({
  fieldName,
  labelName,
  isKey = false,
  sortable = true,
  display = true,
}) => ({
  field: fieldName,
  label: labelName,
  sort: sortable ? 'asc' : false,
});

const transformFields = fields => fields.map(field => convertColumn(field));

const idFieldBtn = row => {
  const { id, ...rest } = row;
  const btn = (
    <MDBBtn color="default" outline size="sm" data-id={id}>
      Lookup
    </MDBBtn>
  );
  return { id: btn, ...rest };
};

export default ({ fields, rows }) => {
  const btnRows = rows.map(row => idFieldBtn(row));
  return (
    <MDBTable autoWidth striped bordered small responsive btn>
      <MDBTableHead columns={transformFields(fields)} />
      <MDBTableBody rows={btnRows} />
    </MDBTable>
  );
};
