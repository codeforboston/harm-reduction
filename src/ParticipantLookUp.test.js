import React from 'react';
import { render, screen, getByText, getAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParticipantLookUp from './ParticipantLookUp';
import Participants from './Participants';


const searches = [
    'abc',
    'bob',
    'dan',
    'alex'
]

const createParticipantDoc = (id, firstName, lastName) => ({
    id,
    data: () => ({ firstName, lastName }),
  });

const participantDocs = [
    createParticipantDoc(1, 'Joe', 'Schmoe'),
    createParticipantDoc(2, 'Sally', 'Jones'),
  ];


const searchString = 'sdsd'

test('can enter search string', async () => {
    render(<Participants />)
    await userEvent.type(screen.getByLabelText('Search Participants'), searchString)
    expect(screen.getByLabelText('Search Participants')).toHaveValue(searchString)
})



test('displays matches', async () => {
    render(<Participants />)
    await userEvent.type(screen.getByLabelText('Search Participants'), searchString)
        expect(getAllByTestId('results').toHaveValue())
    
})