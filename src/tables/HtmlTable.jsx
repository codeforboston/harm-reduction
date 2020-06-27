import React from 'react';

/**
 * rows: data
 * @param {*} props
 */
const HtmlTable = ({ columns, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {columns.map((column, index) => (
              <td key={index}>{row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HtmlTable;
