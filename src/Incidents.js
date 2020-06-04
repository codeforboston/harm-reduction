import React from 'react';
import { P } from './widgets';
import RecordIncidentForm from './RecordIncidentForm';

export default () => {
  return (
    <>
      <P>
        Incidents are overdose events reported by first responders or other
        sources. Revere gets a weekly incident report from a public safety data
        analyst.
      </P>
      <RecordIncidentForm />
    </>
  );
};
