import { render, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecordEngagementForm from './RecordEngagementForm';

jest.mock('./API');

test('Renders Incident Form', () => {
  const engagementForm = render(<RecordEngagementForm />);
  expect(engagementForm).toMatchSnapshot();
});

test.each([
  ['First Name', 'Name', 'Name'],
  ['Last Name', 'Name', 'Name'],
])('%s takes input', (a, b, expected) => {
  const { getByLabelText } = render(<RecordEngagementForm />);
  userEvent.type(getByLabelText(a), b);
  expect(getByLabelText(a)).toHaveValue(expected);
});

//TODO test participant ID, associated incident

test.each([['Narcan Enrollment'], ['First Person']])('%s can be checked', a => {
  const { getByLabelText } = render(<RecordEngagementForm />);

  userEvent.click(getByLabelText(a));
  expect(getByLabelText(a)).toBeChecked();
});

test('Sets stage of change', () => {
  const { getByLabelText } = render(<RecordEngagementForm />);

  userEvent.selectOptions(
    getByLabelText('Stage of Change'),
    'Precontemplation'
  );

  expect(getByLabelText('Stage of Change')).toHaveValue('Precontemplation');
});

test('Date Engaged accepts date', async () => {
  const { getByLabelText } = render(<RecordEngagementForm />);
  const dateInput = getByLabelText('Date Engaged');
  const date = '2020-12-12';

  await userEvent.type(dateInput, date);

  expect(dateInput).toHaveValue(date);
});

test('Can select point person', () => {
  const { getByLabelText } = render(<RecordEngagementForm />);
  userEvent.selectOptions(getByLabelText('Point Person'), 'CarrieAnn');
  expect(getByLabelText('Point Person')).toHaveValue('CarrieAnn');
});
