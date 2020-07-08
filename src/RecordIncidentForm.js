import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addIncident, getParticipantById } from './API';

export default () => {
  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      participantId: '',
      firstName: '',
      lastName: '',
      dateOfRequest: '',
      location: '',
      pointOfContact: '',
      receivedNarcan: '',
      notes: '',
      status: 'Waiting for input',
    }
  );

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const incident = {
      participantId: state.participantId,
      firstName: state.firstName,
      lastName: state.lastName,
      pointOfContact: state.pointOfContact,
      location: state.location,
      dateOfRequest: state.dateOfRequest,
      receivedNarcan: state.receivedNarcan,
      notes: state.notes,
    };

    const addStatus = await addIncident(incident);

    update({ status: addStatus });
  };

  const handleParticipantId = async e => {
    const id = e.target.value;
    update({ participantId: id });
    const participant = id ? await getParticipantById(id) : {};
    update({
      firstName: participant.firstName || '',
      lastName: participant.lastName || '',
    });
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
          <h2 style={{ flex: 1 }}>Add a new incident</h2>
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
              onChange={handleParticipantId}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="location">
              <Form.Label>Location (City/Town)</Form.Label>
              <Form.Control
                value={state.location}
                type="text"
                onChange={e => update({ location: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Row style={{ alignItems: 'center' }}>
            <Form.Group as={Col} controlId="dateOfRequest">
              <Form.Label>Date of Request</Form.Label>
              <Form.Control
                value={state.dateOfRequest}
                type="date"
                onChange={e => update({ dateOfRequest: e.target.value })}
              />
            </Form.Group>
            <Col>
              <Form.Check
                label="Recieved Narcan"
                style={{ verticalAlign: 'middle' }}
                id="recievedNarcan"
                checked={state.recievedNarcan}
                type="checkbox"
                onChange={e => update({ homeless: e.target.checked })}
              />
            </Col>
          </Row>
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows="7" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Record Incident
          </Button>{' '}
          STATUS: {state.status}
        </Form>
      </div>
    </div>
  );
};
