import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LookUpExisting from './LookUpExisting';

const createRecord = num => {
  return {
    id: num,
    firstName: 'firstName_' + num,
    lastName: 'lastName_' + num,
  };
};

const records = [
  createRecord('one'),
  createRecord('two'),
  createRecord('three'),
];

test('Renders LookUpExisting', () => {
  const { getByTestId } = render(
    <LookUpExisting records={records} update={() => {}} />
  );
  expect(getByTestId('LookUpExisting')).toBeInTheDocument();
});

test('Displays results in dropdown', () => {
  const update = () => {};
  const { getByText, getByLabelText } = render(
    <LookUpExisting records={records} update={update} />
  );

  const searchBox = getByLabelText('Search Participants');
  userEvent.type(searchBox, 'firstName_one');

  expect(searchBox.value).toContain('firstName_one');

  expect(screen.getByTestId('searchresults').firstChild).toBeInTheDocument();
  expect(getByText('firstName_one lastName_one')).toBeInTheDocument();
});

test('Notifies selected result', () => {
  let result;
  const update = record => (result = record);
  const { getByText, getByLabelText } = render(
    <LookUpExisting records={records} update={update} />
  );

  const searchBox = getByLabelText('Search Participants');
  userEvent.type(searchBox, 'firstName_one');

  expect(searchBox.value).toContain('firstName_one');

  userEvent.click(getByText('firstName_one lastName_one'));
  expect(result).toEqual(records[0]);
});

test('Clear resets form', () => {
  const searchText = 'Joe';
  const update = () => {};
  const { queryByDisplayValue, getByLabelText, getByText } = render(
    <LookUpExisting records={records} update={update} />
  );

  const searchBox = getByLabelText('Search Participants');
  userEvent.type(searchBox, searchText);

  expect(queryByDisplayValue(searchText)).not.toBeNull();
  userEvent.click(getByText('Clear'));
  expect(queryByDisplayValue(searchText)).toBeNull();
});
