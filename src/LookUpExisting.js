import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default props => {
  const { records, requestData, update } = props;
  const [filteredParts, setFilter] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [selected, setSelected] = useState('none selected');

  const allRecords = Object.values(records);

  const resetLookUp = () => {
    setFilter([]);
    setSelected('none selected');
    setSearchString('');
  };

  const handleChange = e => {
    if (e.keyCode === 27) {
      return resetLookUp();
    }
    if (e.keyCode === 13) {
      setSelected(e.target.value);
      return resetLookUp();
    }
    setSearchString(e.target.value);
console.log(allRecords)
    const matchedRecords = allRecords.filter(b => b.firstName.includes(searchString));

    setFilter(allRecords);
  };

  const fulfillRequestData = result => {
    return requestData.map(r => {
      if (r === 'participantId') {
        r = 'id';
      }
      return result[r] ? result[r] : '';
    });
  };

  const handleResultClick = result => {
    resetLookUp();
    const data = fulfillRequestData(result);
    requestData.map((r, i) => {
      return update({ [r]: data[i] });
    });
    setSelected(result);
  };

  return (
    <div data-testid={'LookUpExisting'}>
      <Form.Group controlId="search">
        <Form.Label>Search Participants</Form.Label>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              value={searchString}
              onChange={handleChange}
              style={{ marginRight: '1em' }}
              autoComplete="off"
            />
            <ListGroup id="search-result-list" data-testid={'searchresults'}>
              {filteredParts.map((p, i) => {
                return (
                  <ListGroup.Item
                    key={i}
                    onClick={() => handleResultClick(p)}
                  >{`${p.firstName} ${p.lastName}`}</ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={resetLookUp}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </div>
  );
};
