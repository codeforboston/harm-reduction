import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import './App.css';

export default () => {
  return (
    <Container fluid className="top-bar">
      <Row>
        <Item to="/" label="Home" />
        <Item to="/participants" label="Participants" />
        <Item to="/incidents" label="Incidents" />
        <Item to="/engagements" label="Engagements" />
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
