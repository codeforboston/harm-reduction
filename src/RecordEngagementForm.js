import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
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
      associatedIncident: '',
      dateEngaged: '',
      pointPerson: '',
      stateOfChange: '',
      needsIdentified: '',
      narcatEnrollment: '',
      followUpDate: '',
      firstPerson: '',
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
      await db.collection('engagements').add({
        participantId: state.participantId,
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
        <Row>
          <Col xs="4">
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={state.firstName}
                    onChange={e => update({ firstName: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={state.lastName}
                    type="text"
                    onChange={e => update({ lastName: e.target.value })}
                  />
                </Form.Group>
              </Col>
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

            <Form.Group controlId="associatedIncident">
              <Form.Label>Associated Incident</Form.Label>
              <Form.Control
                value={state.associatedIncident}
                type="text"
                onChange={e => update({ associatedIncident: e.target.value })}
              />
            </Form.Group>

            <Form.Check
              id="narcanEnrollment"
              style={{ margin: '20px 0 10px 0' }}
              label="Narcan Enrollment"
              checked={state.narcatEnrollment}
              type="checkbox"
              onChange={e => update({ narcatEnrollment: e.target.checked })}
            />
            <Form.Check
              id="firstPerson"
              style={{ margin: '10px 0 20px 0' }}
              label="First Person"
              checked={state.firstPerson}
              type="checkbox"
              onChange={e => update({ firstPerson: e.target.checked })}
            />
          </Col>
          <Col xs="8">
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
          </Col>
        </Row>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows="7" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Record Engagement
        </Button>{' '}
        STATUS = {state.status}
      </Form>
    </div>
  );
};
