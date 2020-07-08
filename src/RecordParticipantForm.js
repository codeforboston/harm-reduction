import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LookUpExisting from './LookUpExisting';
import FormSelect from './FormSelect';
import {
  stateOfChange,
  newOrExisting,
  age,
  gender,
  ethnicity,
  race,
} from './Options';
import { addParticipant, db } from './API';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      firstName: '',
      lastName: '',
      stateOfChange: stateOfChange.default,
      newOrExisting: newOrExisting.default,
      status: 'Waiting for input',
      age: age.default,
      gender: gender.default,
      ethnicity: ethnicity.default,
      race: race.default,
      revereResident: false,
      homeless: false,
    }
  );

  const [participants, setParticipants] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    update({ [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const participant = {
      firstName: state.firstName,
      lastName: state.lastName,
      stateOfChange: state.stateOfChange,
      newOrExisting: state.newOrExisting,
      age: state.age,
      gender: state.gender,
      ethnicity: state.ethnicity,
    };
    const addStatus = await addParticipant(participant);
    update({ status: addStatus });
  };

  useEffect(
    () =>
      db.collection('participants').onSnapshot(snapshot => {
        const participants = [];
        snapshot.forEach(doc => {
          participants.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setParticipants(participants);
      }),
    []
  );

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
        <h2 style={{ flex: 1 }}>Add a new participant</h2>
        <p style={{ flex: 1, fontWeight: '400', fontSize: '1em' }}>
          <em>{state.status}</em>
        </p>
      </div>
      <LookUpExisting records={participants} update={update} />
      <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
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
        <Form.Check
          style={{ margin: '20px 0 10px 0' }}
          label="Revere Resident"
          id="revereResident"
          checked={state.revereResident}
          type="checkbox"
          onChange={e => update({ revereResident: e.target.checked })}
        />
        <Form.Check
          style={{ margin: '10px 0 20px 0' }}
          label="Homeless"
          id="homeless"
          checked={state.homeless}
          type="checkbox"
          onChange={e => update({ homeless: e.target.checked })}
        />

        <FormSelect
          label="State of Change"
          value={state.stateOfChange}
          onChange={handleChange}
          options={stateOfChange.options}
        />
        <FormSelect
          label="New or Existing"
          value={state.newOrExisting}
          onChange={handleChange}
          options={newOrExisting.options}
        />
        <FormSelect
          label="Age"
          value={state.age}
          onChange={handleChange}
          options={age.options}
        />
        <FormSelect
          label="Gender"
          value={state.gender}
          onChange={handleChange}
          options={gender.options}
        />
        <FormSelect
          label="Ethnicity"
          value={state.ethnicity}
          onChange={handleChange}
          options={ethnicity.options}
        />
        <FormSelect
          label="Race"
          value={state.race}
          onChange={handleChange}
          options={race.options}
        />

        <Button variant="primary" type="submit">
          Record Participant
        </Button>
      </Form>
    </div>
  );
};
