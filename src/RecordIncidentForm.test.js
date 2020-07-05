import { render, act, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { db, addIncident } from './API';
import RecordIncidentForm from './RecordIncidentForm';
import { stateOfChange } from './Options';

jest.mock('./API');

test('Renders Incident Form', () => {
  const incidentForm = render(<RecordIncidentForm />);
  expect(incidentForm).toMatchSnapshot();
});

test.each([
  ['First Name', 'Name', 'Name'],
  ['Last Name', 'Name', 'Name'],
  ['Location (City/Town)', 'Location', 'Location'],
])('%s takes input', (a, b, expected) => {
  const { getByLabelText } = render(<RecordIncidentForm />);
  userEvent.type(getByLabelText(a), b);
  expect(getByLabelText(a)).toHaveValue(expected);
});

test('Date field accepts date', async () => {
  const { getByLabelText } = render(<RecordIncidentForm />);
  const dateInput = getByLabelText('Date of Request');
  const date = '2020-12-12';

  await userEvent.type(dateInput, date);

  expect(dateInput).toHaveValue(date);
});

test('Can check narcan box', async () => {
  const { getByLabelText } = render(<RecordIncidentForm />);
  await userEvent.click(getByLabelText('Recieved Narcan'));
  expect(getByLabelText('Recieved Narcan')).toBeChecked();
});
