import React from 'react';
import Form from 'react-bootstrap/Form';

export default ({ label, value, onChange, options }) => {
  const formOptions = options => {
    return options.map(o => <option key={o}>{o}</option>);
  };
  const formatId = label => {
    let labelWords = label
      .split(' ')
      .map(w => w.replace(w[0], w[0].toUpperCase()));
    let controlId = labelWords
      .join('')
      .replace(labelWords[0], labelWords[0].toLowerCase());
    return controlId;
  };

  return (
    <Form.Group controlId={formatId(label)}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" type="text" value={value} onChange={onChange}>
        {formOptions(options)}
      </Form.Control>
    </Form.Group>
  );
};
