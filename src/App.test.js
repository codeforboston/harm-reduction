import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const renderApp = () =>
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

test('renders home page by default', () => {
  const { getByText } = renderApp();
  expect(getByText(/Hello!/i)).toBeInTheDocument();
});

test('can select participants', () => {
  const { getByText } = renderApp();
  userEvent.click(getByText('Participants'));
  expect(getByText(/Anyone that recieves help from WROC is a participant/i));
});

test('can select incidents', () => {
  const { getByText } = renderApp();
  userEvent.click(getByText('Incidents'));
  expect(
    getByText(
      /Incidents are overdose events reported by first responders or other sources/i
    )
  );
});

test('can select engagements', () => {
  const { getByText } = renderApp();
  userEvent.click(getByText('Engagements'));
  expect(
    getByText(/Engagements are interactions between WROC and a participant/i)
  );
});
