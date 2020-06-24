import React, { useReducer, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormSelect from './FormSelect';
import { db } from './Firebase';
import { useAuthState } from './Auth';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      firstName: '',
      lastName: '',
    }
  );

  const { user } = useAuthState()
  const userDoc = db.collection('users').doc(user.uid)

  useEffect(() => {
    const loadUser = async () => {
      const { firstName, lastName } = await userDoc.get();
      update({ firstName, lastName });
    }
    loadUser();
  }, [])

  const handleChange = e => {
    const value = e.target.value;
    const id = e.target.id;
    update({ [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await userDoc.set({ firstname: state.firstName, lastName: state.lastName })
      update({ status: 'Profile Updated!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'flex-start',
          marginBottom: '2em',
        }}
      >
        <h2 style={{ flex: 1 }}>Your Profile</h2>
        <p style={{ flex: 1, fontWeight: '400', fontSize: '1em' }}>
          <em>{state.status}</em>
        </p>
      </div>
      <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={state.firstName}
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
          Update Profile
        </Button>
      </Form>
    </div>
  );
};
