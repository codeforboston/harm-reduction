import React from 'react';
import { render } from '@testing-library/react';
import { AppStateProvider, useAppState } from '.';
import { addParticipant, updateParticipant } from './actions';
import { initialState } from './reducer';
import { act } from 'react-dom/test-utils';

const renderApp = () =>
  render(
    <AppStateProvider>
      <GrabAppState />
    </AppStateProvider>
  );

let state, dispatch;
const GrabAppState = () => {
  [state, dispatch] = useAppState();
  return null;
};

test('initially empty state', () => {
  renderApp();
  expect(state).toEqual(initialState);
});

test('can manipulate participant', () => {
  renderApp();

  const participant = {
    id: 2,
    firstName: 'Joe',
    lastName: 'Schmoe',
    age: 55,
  };

  act(() => {
    dispatch(updateParticipant(participant));
  });

  expect(state.participants[participant.id]).toEqual(participant);

  const update = { ...participant, firstName: 'Jose' };

  act(() => {
    dispatch(updateParticipant(update));
  });

  expect(state.participants[participant.id]).toEqual(update);
});
