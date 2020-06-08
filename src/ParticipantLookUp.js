import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default props => {
  const { participants, selection } = props;
  const [filteredParts, setFilter] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [selected, setSelected] = useState('none selected');

  const partsValue = Object.values(participants);

  const resetLookUp = () => {
    setFilter([]);
    setSelected('none selected');
    setSearchString('');
  };

  const handleKeyUp = e => {
    if (e.keyCode === 27) {
      return resetLookUp();
    }
    if (e.keyCode === 13) {
      setSelected(e.target.value);
      return resetLookUp();
    }
    setSearchString(e.target.value);
    const matchParts = partsValue.filter(b =>
      b.firstName.includes(searchString)
    );
    setFilter(matchParts);
  };

  const handleResultClick = result => {
    resetLookUp();
    selection(result);
    setSelected(result);
  };

  const singleResult = (key, result, attribute) => {
    return (
      <tr key={key}>
        <td>
          <div onClick={() => handleResultClick(result)}>
            {result[attribute]}
          </div>
        </td>
      </tr>
    );
  };

  const resultList = (results, attribute) => {
    if (results.length > 0) {
      return results.map((a, i) => singleResult(i, a, attribute));
    } else {
      return [];
    }
  };

  return (
    <div>
      <Form.Group controlId="search">
        <Form.Label>Search Participants</Form.Label>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              value={searchString}
              onChange={handleKeyUp}
              style={{ marginRight: '1em' }}
            />
            <table className="table table-bordered">
              <thead></thead>
              <tbody>{resultList(filteredParts, 'firstName')}</tbody>
            </table>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={resetLookUp}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="result">
        <Form.Label>
          Selected (this will actually just populate form, but for now an extra
          box):
        </Form.Label>
        <Form.Control
          type="text"
          value={typeof selected === 'string' ? selected : selected.firstName}
          readOnly
        />
      </Form.Group>
    </div>
  );
};
