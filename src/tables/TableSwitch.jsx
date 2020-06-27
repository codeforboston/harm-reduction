import React from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Badge from 'react-bootstrap/Badge';

export const tableTypes = [
  { name: 'HTML', title: 'Non-Interactive HTML' },
  { name: 'Bootstrap', title: 'Sortable Bootstrap' },
  { name: 'MDB', title: 'Material Design' },
  { name: 'MUI', title: 'Material UI' },
  { name: 'Material', title: 'MUI-based expansion' },
];

const TableSwitch = ({ currentTable, updateTableType }) => {
  return (
    <ButtonToolbar className="justify-content-start">
      <h5 style={{ marginRight: '1em' }} className="table-select">
        Table Type:
      </h5>
      <ToggleButtonGroup
        type="radio"
        name="tableType"
        value={currentTable}
        onChange={updateTableType}
        className="mb-2"
      >
        {tableTypes.map((table, index) => (
          <ToggleButton
            key={index}
            variant="outline-secondary"
            value={index}
            title={table.title}
          >
            {table.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <h5 style={{ marginLeft: '3em' }} className="current-value">
        Current: <Badge variant="info">{tableTypes[currentTable].name}</Badge>
      </h5>
    </ButtonToolbar>
  );
};

export default TableSwitch;
