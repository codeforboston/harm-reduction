import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { db, addParticipant } from './API';
import Participants from './Participants';
import {
  age,
  ethnicity,
  gender,
  stateOfChange,
  newOrExisting,
} from './Options';

jest.mock('./API');

const createParticipantDoc = (id, firstName, lastName) => ({
  id,
  data: () => ({ firstName, lastName }),
});

const participantDocs = [
  createParticipantDoc(1, 'Joe', 'Schmoe'),
  createParticipantDoc(2, 'Sally', 'Jones'),
];

const renderParticipants = () =>
  render(
    <MemoryRouter>
      <Participants />
    </MemoryRouter>
  );

test('Renders a form and table of participants', () => {
  db.collection.mockReturnValueOnce({
    onSnapshot: callback => callback(participantDocs),
  });

  const { getByText } = renderParticipants();

  participantDocs.forEach(doc =>
    expect(getByText(doc.data().firstName)).toBeInTheDocument()
  );
});

test('Can record a participant', async () => {
  const { firstName, lastName } = participantDocs[0].data();

  db.collection.mockReturnValue({
    onSnapshot: callback => callback([]),
  });

  const { getByText, getByLabelText } = renderParticipants();

  await userEvent.type(getByLabelText('First Name'), firstName);
  await userEvent.type(getByLabelText('Last Name'), lastName);
  await act(async () => userEvent.click(getByText('Record Participant')));

  expect(addParticipant).toHaveBeenCalledWith({
    firstName,
    lastName,
    age: age.default,
    ethnicity: ethnicity.default,
    gender: gender.default,
    newOrExisting: newOrExisting.default,
    stateOfChange: stateOfChange.default,
  });
});
