import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { db } from './Firebase';
import LookUpExisting from './LookUpExisting';
import RecordEngagementForm from './RecordEngagementForm';

jest.mock('./Firebase');

const createRecord = num => {
  return [
    'participantId_' + num,
    'firstName_' + num,
    'lastName_' + num,
    'associatedIncident_' + num,
    'dateEngaged_' + num,
    'pointPerson_' + num,
    'stateOfChange_' + num,
    'needsIdentified_' + num,
    'narcanEnrollment_' + num,
    'followUpDate_' + num,
    'firstPerson_' + num,
    'notes_' + num,
    'status_' + num,
  ];
};

const records = [createRecord("one"), createRecord("two"), createRecord("three")];

test('Renders LookUpExisting', () => {
  const { container, getByTestId } = render(
    <LookUpExisting records={records} />
  );
  expect(getByTestId('LookUpExisting')).toBeInTheDocument();
});

test('lists results when search', async () => {
  render(<LookUpExisting records={records} />);

  const searchBox = screen.getByLabelText('Search Participants')
  await userEvent.type(searchBox, "firstName")

  expect(screen.getByTestId('searchresults').firstChild).toBeInTheDocument()
})


test('Passes data to RecordForm',  () => {
  render(<LookUpExisting records={records} />);

  const searchBox = screen.getByLabelText('Search Participants')
   userEvent.type(searchBox, "firstName")
  
  expect(searchBox.value).toContain("firstName")
  
})


test('Clear resets form', () => {
  render(<LookUpExisting records={records} />);

  userEvent.click(screen.getByText('Clear'));

  expect(screen.getByTestId('searchresults').firstChild).not.toBeInTheDocument()
});



