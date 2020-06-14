import React, { useReducer, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormSelect from './FormSelect';
import { db } from './Firebase';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      participantId: '',
      firstName: '',
      lastName: '',
      associatedIncident: 'None selected',
      dateEngaged: '',
      pointPerson: '',
      stateOfChange: '',
      needsIdentified: '',
      narcanEnrollment: '',
      followUpDate: '',
      firstPerson: '',
      notes: '',
      status: 'Waiting for input',
    }
  );
  const [incidents, setIncidents] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(
    () =>
      db.collection('incidents').onSnapshot(snapshot => {
        const incidents = [];
        snapshot.forEach(doc => {
          incidents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setIncidents(incidents);
      }),
    []
  );

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

  const handleChange = e => {
    const value = e.target.value;
    const id = e.target.id;
    update({ [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await db.collection('engagements').add({
        participantId: state.participantId,
        firstName: state.firstName,
        lastName: state.lastName,
        associatedIncident: state.associatedIncident,
        dateEngaged: state.dateEngaged,
        pointPerson: state.pointPerson,
        stateOfChange: state.stateOfChange,
        needsIdentified: state.needsIdentified,
        narcanEnrollment: state.narcanEnrollment,
        followUpDate: state.followUpDate,
        firstPerson: state.firstPerson,
        notes: state.notes,
      });
      update({ status: 'Submitted!' });
    } catch (e) {
      update({ status: 'Error! ' + e });
    }
  };

  const displayIncident = incident => {
    return (
      <Form.Group
        style={{
          border: '.5px',
          borderStyle: 'solid',
          borderColor: 'lightgray',
          borderRadius: '5px',
          padding: '1em',
        }}
      >
        <p>Incident Id: {incident.id}</p>
        <p>Date of Incident: {incident.dateOfRequest}</p>
        <p>Location: {incident.location}</p>
        <p>Recieved Narcan: {incident.receivedNarcan}</p>
        <p>ParticipantId: {incident.participantId}</p>
      </Form.Group>
    );
  };
  const fillParticipantInfo = e => {
    const partFiltered = participants.filter(a => a.id === e.target.value);
    update({ participantId: e.target.value });
    update({ firstName: partFiltered[0] ? partFiltered[0].firstName : '' });
    update({ lastName: partFiltered[0] ? partFiltered[0].lastName : '' });
  };

  const associatedIncidents = incidents.filter(
    a => a.participantId === state.participantId
  );

  return (
    <div>
      <div
        style={{
          width: '50%',
          marginLeft: '5%',
          marginTop: '5%',
          marginBottom: '5%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            marginBottom: '2em',
          }}
        >
          <h2 style={{ flex: 1 }}>Add a new engagement</h2>
          <p style={{ flex: 1, fontWeight: '400', fontSize: '1em' }}>
            <em>{state.status}</em>
          </p>
        </div>
        <Form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={state.firstName}
                onChange={e => update({ firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={state.lastName}
                type="text"
                onChange={e => update({ lastName: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="participantId">
            <Form.Label>Participant ID</Form.Label>
            <Form.Control
              required
              value={state.participantId}
              type="text"
              onChange={e => fillParticipantInfo(e)}
            />
          </Form.Group>
          <FormSelect
            label="Associated Incident"
            options={['None selected', ...associatedIncidents.map(a => a.id)]}
            onChange={handleChange}
          />
          <Form.Group>
            {associatedIncidents
              .filter(a => a.id === state.associatedIncident)
              .map(a => displayIncident(a))}
          </Form.Group>
          <Form.Check
            id="narcanEnrollment"
            style={{ margin: '20px 0 10px 0' }}
            label="Narcan Enrollment"
            checked={state.narcanEnrollment}
            type="checkbox"
            onChange={e => update({ narcanEnrollment: e.target.checked })}
          />
          <Form.Check
            id="firstPerson"
            style={{ margin: '10px 0 20px 0' }}
            label="First Person"
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
            label="Point Person"
            value={state.pointPerson}
            onChange={handleChange}
            options={['Not Assigned', 'CarrieAnn', 'Chris']}
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
            Record Engagement
          </Button>{' '}
          STATUS: {state.status}
        </Form>
      </div>
    </div>
  );
};
