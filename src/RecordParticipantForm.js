import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormSelect from './FormSelect';
import { db } from './Firebase';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      firstName: '',
      lastName: '',
      stateOfChange: 'Not Answered',
      newOrExisting: 'New',
      status: 'Waiting for input',
      age: '0',
      gender: 'Not Answered',
      ethnicity: 'Not Answered',
      race: 'Not Answered',
      revereResident: false,
      homeless: false,
    }
  );

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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: "baseline", justifyContent: "flex-start", marginBottom: "2em" }}>
        <h2 style={{flex: 1}}>Add a new participant</h2>
        <p style={{ flex: 1, fontWeight: '400', fontSize: '1em'}}>
          <em>{state.status}</em>
        </p>
      </div>
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
          options={[
            'Not Decided',
            'Precontemplation',
            'Contemplation',
            'Preparation',
            'Action',
            'Maintenance',
          ]}
        />
        <FormSelect
          label="New or Existing"
          value={state.newOrExisting}
          onChange={handleChange}
          options={['New', 'Existing']}
        />
        <FormSelect
          label="Age"
          value={state.age}
          onChange={handleChange}
          options={[
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
          ]}
        />
        <FormSelect
          label="Gender"
          value={state.gender}
          onChange={handleChange}
          options={['Not Answered', 'male', 'female', 'other']}
        />
        <FormSelect
          label="Ethnicity"
          value={state.ethnicity}
          onChange={handleChange}
          options={['Not Answered', 'Non-Hispanic', 'Hispanic']}
        />
        <FormSelect
          label="Race"
          value={state.race}
          onChange={handleChange}
          options={[
            'Not Answered',
            'American Indian/Alaskan',
            'Asian',
            'African American/Black',
            'Caucasian/White',
            'More Than One Race',
            'Native Hawaiian/Pacific Islander',
          ]}
        />

        <Button variant="primary" type="submit">
          Record Participant
        </Button>
      </Form>
    </div>
  );
};
