import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './Auth';
import { auth, db } from './Firebase';

jest.mock('./Firebase');

const renderApp = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );

db.collection.mockImplementation(() => ({
  onSnapshot: callback => callback([]),
}));

test('renders login page if not authenticated', async () => {
  auth.onAuthStateChanged.mockImplementationOnce(callback => callback(null));
  const { getByText } = renderApp();
  expect(getByText(/Log In/i)).toBeInTheDocument();
});

test('renders home page if authenticated', () => {
  auth.onAuthStateChanged.mockImplementationOnce(callback => callback({}));
  const { queryByText } = renderApp();
  expect(queryByText(/Hello!/i)).toBeInTheDocument();
});

test('can select participants', () => {
  auth.onAuthStateChanged.mockImplementationOnce(callback => callback({}));
  const { getByText } = renderApp();
  userEvent.click(getByText('Participants'));
  expect(getByText(/Anyone that recieves help from WROC is a participant/i));
});

test('can select incidents', () => {
  auth.onAuthStateChanged.mockImplementationOnce(callback => callback({}));
  const { getByText } = renderApp();
  userEvent.click(getByText('Incidents'));
  expect(
    getByText(
      /Incidents are overdose events reported by first responders or other sources/i
    )
  );
});

test('can select engagements', () => {
  auth.onAuthStateChanged.mockImplementationOnce(callback => callback({}));
  const { getByText } = renderApp();
  userEvent.click(getByText('Engagements'));
  expect(
    getByText(/Engagements are interactions between WROC and a participant/i)
  );
});
