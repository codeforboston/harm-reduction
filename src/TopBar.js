import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import './App.css';
import Button from 'react-bootstrap/Button';
import { auth } from './Firebase';

export default () => {
  return (
    <Container fluid className="top-bar">
      <Row style={{ alignItems: 'center' }}>
        <Item to="/" label="Home" />
        <Item to="/participants" label="Participants" />
        <Item to="/incidents" label="Incidents" />
        <Item to="/engagements" label="Engagements" />
        <div style={{ flexGrow: 1 }} />
        <Button variant="light" onClick={() => auth.signOut()}>
          Log Out
        </Button>
      </Row>
    </Container>
  );
};

const Item = ({ to, label }) => (
  <NavLink
    exact
    className="top-bar-nav-link"
    to={to}
    activeClassName="active-top-bar-nav-link"
  >
    {label}
  </NavLink>
);
