import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NavLink, useHistory } from 'react-router-dom';
import './App.css';
import Button from 'react-bootstrap/Button';
import { auth } from './API';

export default () => {
  let history = useHistory();

  function handleClick() {
    history.push('/profile');
  }

  return (
    <Container fluid className="top-bar">
      <Row style={{ alignItems: 'center' }}>
        <Item to="/" label="Home" />
        <Item to="/participants" label="Participants" />
        <Item to="/incidents" label="Incidents" />
        <Item to="/engagements" label="Engagements" />
        <div style={{ flexGrow: 1 }} />
        <Button
          className="profile-button"
          variant="dark"
          label="Profile"
          onClick={handleClick}
        >
          Profile
        </Button>
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
