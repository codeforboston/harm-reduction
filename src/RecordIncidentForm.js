import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from './Firebase';
import FormSelect from './FormSelect';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      participant: '',
      dateOfRequest: '',
      location: '',
      pointOfContact: '',
      receivedNarcan: '',
      notes: '',
      status: 'waiting for input'
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
      await db.collection('incidents').add({
        participant: state.participant,
        pointOfContact: state.pointOfContact,
        location: state.location,
        dateOfRequest: state.dateOfRequest,
        pointOfContact: state.pointOfContact,
        receivedNarcan: state.receivedNarcan,
        notes: state.notes
      });
      update({ status: 'Submitted!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
  };

  return (
    <div>
      <h2>Add a new incident: {state.status}</h2>
      <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Form.Group controlId="participant">
          <Form.Label>Participant</Form.Label>
          <Form.Control
            required
            value={state.participant}
            type="text"
            onChange={e => update({ participant: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location (City/Town)</Form.Label>
          <Form.Control
            required
            value={state.location}
            type="text"
            onChange={e => update({ location: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="dateOfRequest">
          <Form.Label>Date of Request</Form.Label>
          <Form.Control
            required
            value={state.dateOfRequest}
            type="date"
            onChange={e => update({ dateOfRequest: e.target.value })}
          />
        </Form.Group>
        <FormSelect
          label="Point of Contact"
          onChange={handleChange}
          options={['Not Assigned', 'CarrieAnn', 'Chris']}
        />
        <Form.Check
          style={{ margin: '20px' }}
          label="Recieved Narcan"
          id="recievedNarcan"
          checked={state.recievedNarcan}
          type="checkbox"
          onChange={e => update({ homeless: e.target.checked })}
        />
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows="7" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Record Incident
        </Button>
      </Form>
    </div>
  );
};
