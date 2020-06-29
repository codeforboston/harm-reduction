import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Incidents from './Incidents';
import IncidentTable from './IncidentTable';
import RecordIncidentForm from './RecordIncidentForm';
import Participants from './Participants';
import ParticipantTable from './ParticipantTable';
import RecordParticipantForm from './RecordParticipantForm';
import Engagements from './Engagements';
// import EngagementTable from './EngagementTable';
import RecordEngagementForm from './RecordEngagementForm';
import Home from './Home';
import Logout from './Logout';

export default () => (
  <div className="content">
    <Switch>
      {/* TODO: reduce */}
      {/* Participants */}
      <Route path="/participants">
        <Participants />
      </Route>
      <Route path="/participant/add">
        <RecordParticipantForm />
      </Route>
      <Route path="/participant/all">
        <ParticipantTable />
      </Route>
      <Route path="/participant/view/:id">
        <RecordParticipantForm action="show" />
      </Route>
      <Route path="/participant/update/:id">
        <RecordParticipantForm action="edit" />
      </Route>
      {/* Incidents */}
      <Route path="/incidents">
        <Incidents />
      </Route>
      <Route path="/incident/add">
        <RecordIncidentForm />
      </Route>
      <Route path="/incident/all">
        <IncidentTable />
      </Route>
      <Route path="incident/view/:id">
        <RecordIncidentForm action="show" />
      </Route>
      <Route path="/incident/update/:id">
        <RecordIncidentForm action="edit" />
      </Route>
      {/* Engagements */}
      <Route path="/engagements">
        <Engagements />
      </Route>
      <Route path="/engagement/add">
        <RecordEngagementForm />
      </Route>
      <Route path="/engagement/all">
        <Engagements />
      </Route>
      <Route path="/engagement/view/:id">
        <RecordEngagementForm action="show" />
      </Route>
      <Route path="/engagement/update/:id">
        <RecordEngagementForm action="edit" />
      </Route>
      {/* system */}
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);
