import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataTable from './DataTable';

const columns = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Name' },
  { field: 'age', title: 'Age' },
];

const rows = [
  { id: 1, name: 'Dick', age: 10 },
  { id: 2, name: 'Jane', age: 12 },
  { id: 3, name: 'Spot', age: 2 },
];

test('Renders component', () => {
  const { baseElement } = render(
    <MemoryRouter>
      <DataTable columns={columns} rows={rows} collectionName="test" />
    </MemoryRouter>
  );
  expect(baseElement).toMatchSnapshot();
});
