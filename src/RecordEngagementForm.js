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
      associatedIncident: '',
      dateEngaged: '',
      pointPerson: '',
      stateOfChange: '',
      needsIdentified: '',
      narcatEnrollment: '',
      followUpDate: '',
      firstPerson: '',
      notes: '',
      status: 'waiting for input',
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
        associatedIncident: state.associatedIncident,
        dateEngaged: state.dateEngaged,
        pointPerson: state.pointPerson,
        stateOfChange: state.stateOfChange,
        needsIdentified: state.needsIdentified,
        narcatEnrollment: state.narcatEnrollment,
        followUpDate: state.followUpDate,
        firstPerson: state.firstPerson,
        notes: state.notes,
      });
      update({ status: 'Submitted!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
  };

  return (
    <div>
      <h2>Add a new engagement: {state.status}</h2>
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
        <FormSelect
          label="Associated Incident"
          value={state.associatedIncident}
          onChange={handleChange}
          options={[
            'Not Selected',
            'Incident',
            'Incident',
            'Incident',
            'Incident',
            'Incident',
            'Incident',
          ]}
        />
        <Form.Check
          style={{ margin: '20px 0 10px 0' }}
          label="Narcan Enrollment"
          id="narcanEnrollment"
          checked={state.narcatEnrollment}
          type="checkbox"
          onChange={e => update({ narcatEnrollment: e.target.checked })}
        />
        <Form.Check
          style={{ margin: '10px 0 20px 0' }}
          label="First Person"
          id="firstPerson"
          checked={state.firstPerson}
          type="checkbox"
          onChange={e => update({ firstPerson: e.target.checked })}
        />
        <Form.Group controlId="dateEngaged">
          <Form.Label>Date Engaged</Form.Label>
          <Form.Control
            required
            value={state.dateEngaged}
            type="date"
            onChange={e => update({ dateEngaged: e.target.value })}
          />
        </Form.Group>
        <FormSelect
          label="pointPerson"
          value={state.pointPerson}
          onChange={handleChange}
          options={['CarrieAnn', 'Chris']}
        />
        <FormSelect
          label="Stage of Change"
          value={state.stageOfChange}
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
        <Form.Group controlId="followUpDate">
          <Form.Label>Follow Up Date</Form.Label>
          <Form.Control
            required
            value={state.followUpDate}
            type="date"
            onChange={e => update({ followUpDate: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows="7" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Record Participant
        </Button>
      </Form>
    </div>
  );
};
