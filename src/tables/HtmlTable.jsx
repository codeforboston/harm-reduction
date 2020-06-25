import React from 'react';

/*
columns = [{
  dataField: 'id',
  text: 'ID',
}] */

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
  dataField: fieldName,
  text: labelName,
  visible: display,
});

const transformFields = fields => fields.map(field => convertColumn(field));

/**
 * rows: data
 * @param {*} props
 */
const HtmlTable = ({ fields, rows }) => {
  const columns = transformFields(fields);
  return (
    <table>
      <thead>
        <tr>
          {columns.map(
            (column, index) =>
              column.visible && <th key={index}>{column.text}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {columns.map(
              (column, index) =>
                column.visible && <td key={index}>{row[column.dataField]}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HtmlTable;
