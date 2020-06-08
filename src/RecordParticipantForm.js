import React, { useReducer, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormSelect from './FormSelect';
import { db } from './Firebase';
import ParticipantLookUp from './ParticipantLookUp';

export const stateOfChange = {
  default: 'Not Decided',
  options: [
    'Not Decided',
    'Precontemplation',
    'Contemplation',
    'Preparation',
    'Action',
    'Maintenance',
  ],
};

export const newOrExisting = {
  default: 'New',
  options: ['New', 'Existing'],
};

export const age = {
  default: 'Not Answered',
  options: [
    'Not Answered',
    '0 - 4',
    '5 - 11',
    '12 - 14',
    '15 - 17',
    '18 - 20',
    '21 - 24',
    '25 - 44',
    '45 - 64',
    '65+',
  ],
};

export const gender = {
  default: 'Not Answered',
  options: ['Not Answered', 'male', 'female', 'other'],
};

export const ethnicity = {
  default: 'Not Answered',
  options: ['Not Answered', 'Non-Hispanic', 'Hispanic'],
};

export const race = {
  default: 'Not Answered',
  options: [
    'Not Answered',
    'American Indian/Alaskan',
    'Asian',
    'African American/Black',
    'Caucasian/White',
    'More Than One Race',
    'Native Hawaiian/Pacific Islander',
  ],
};

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
    const value = e.target.value;
    const id = e.target.id;
    update({ [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await db.collection('participants').add({
        firstName: state.firstName,
        lastName: state.lastName,
        stateOfChange: state.stateOfChange,
        newOrExisting: state.newOrExisting,
        age: state.age,
        gender: state.gender,
        ethnicity: state.ethnicity,
      });
      update({ status: 'Submitted!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
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

  const select = a => {
    Object.entries(a).forEach(entry => update({ [entry[0]]: entry[1] }));
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
        <h2 style={{ flex: 1 }}>Add a new participant</h2>
        <p style={{ flex: 1, fontWeight: '400', fontSize: '1em' }}>
          <em>{state.status}</em>
        </p>
      </div>
      <ParticipantLookUp participants={participants} selection={select} />
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
