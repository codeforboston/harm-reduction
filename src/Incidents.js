import React from 'react';
import Airtable from './Airtable';
import { P } from './widgets';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <>
      <P>
        Incidents are overdose events reported by first responders or other
        sources. Revere gets a weekly incident report from a public safety data
        analyst.
      </P>
      <P>
        A participant is required to record an incident. If the participant does
        not appear in the form, please add them{' '}
        <Link to="/participants">here</Link>. In the future, we will make it
        easier to add participants while recording incidents.
      </P>
      <Airtable.RecordIncidentForm />
      <P>
        Revere performs weekly outreach in response to incidents. Outstanding
        incidents without outreach engagement are shown in the table below,
        corresponding to the outreach for the week.
      </P>
      <Airtable.OutstandingIncidents />
    </>
  );
};
