import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Incidents from './Incidents';
import Participants from './Participants';
import Engagements from './Engagements';
import Home from './Home';

export default () => (
  <div className="content">
    <Switch>
      <Route path="/participants">
        <Participants />
      </Route>
      <Route path="/incidents">
        <Incidents />
      </Route>
      <Route path="/engagements">
        <Engagements />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);
