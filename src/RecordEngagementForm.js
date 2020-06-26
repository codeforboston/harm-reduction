import React, { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormSelect from './FormSelect';
import {
  addEngagement,
  getParticipantById,
  getIncidentsByParticipantId,
} from './FirebaseEngagementForm';

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
  const [participant, setParticipant] = useState([]);

  const handleParticipantUpdate = async id => {
    update({participantId: id});
    const participant = id ? await getParticipantById(id) : {};
    setParticipant(participant);
    await getIncidents(id);
    update({
      firstName: participant.firstName || '',
      lastName: participant.lastName || '',
    });
  };

  const getIncidents = async id => {
    const incidentsById = await getIncidentsByParticipantId(id);
    setIncidents(incidentsById);
  };

  const handleChange = e => {
    const value = e.target.value;
    const id = e.target.id;
    update({ [id]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const engagement = {
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
    };

    const addStatus = await addEngagement(engagement);
    update({ status: addStatus });
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
        key={incident.id}
      >
        <p>Incident Id: {incident.id}</p>
        <p>Date of Incident: {incident.dateOfRequest}</p>
        <p>Location: {incident.location}</p>
        <p>Recieved Narcan: {incident.receivedNarcan}</p>
        <p>ParticipantId: {incident.participantId}</p>
      </Form.Group>
    );
  };

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
              <Form.Control value={state.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={state.lastName}
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="participantId">
            <Form.Label>Participant ID</Form.Label>
            <Form.Control
              required
              value={state.participantId}
              type="text"
              onChange={e => handleParticipantUpdate(e.target.value)}
            />
          </Form.Group>
          <FormSelect
            label="Associated Incident"
            options={['None selected', ...incidents.map(a => a.id)]}
            onChange={handleChange}
          />
          {incidents
            .filter(incident => incident.id === state.associatedIncident)
            .map(incident => displayIncident(incident))}
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
