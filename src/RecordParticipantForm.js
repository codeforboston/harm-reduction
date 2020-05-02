import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from './Firebase';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      firstName: '',
      lastName: '',
      status: 'waiting for input',
    }
  );

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await db
        .collection('participants')
        .add({ firstName: state.firstName, lastName: state.lastName });
      update({ status: 'Submitted!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
  };

  return (
    <div>
      <h2>Add a new participant: {state.status}</h2>
      <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            value={state.firstName}
            type="text"
            onChange={e => update({ firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            value={state.lastName}
            type="text"
            onChange={e => update({ lastName: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Record Participant
        </Button>
      </Form>
    </div>
  );
};
