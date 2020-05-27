import React, { useReducer, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from './Firebase';
import FormSelect from './FormSelect';

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
        participantId: state.participantId,
        firstName: state.firstName,
        lastName: state.lastName,
        pointOfContact: state.pointOfContact,
        location: state.location,
        dateOfRequest: state.dateOfRequest,
        pointOfContact: state.pointOfContact,
        receivedNarcan: state.receivedNarcan,
        notes: state.notes,
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
        <Row>
          <Col xs="4">
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
                onChange={e => update({ participantId: e.target.value })}
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
          </Col>
          <Col xs="8">
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows="7" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Record Incident
        </Button>{' '}
        STATUS = {state.status}
      </Form>
    </div>
  );
};
