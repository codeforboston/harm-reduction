import React from 'react';
import Airtable from './Airtable';
import { P } from './widgets';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <>
      <P>
        Engagements are interactions between WROC and a participant. Overdose
        outreach responses are recorded as engagements, as are interactions at
        drop-in hours.
      </P>
      <P>
        A participant is required to record an engagement. If the participant
        does not appear in the form, please add them{' '}
        <Link to="/participants">here</Link>. In the future, we will make it
        easier to add participants while recording engagements.
      </P>
      <Airtable.RecordEngagementForm />
      <P>
        Engagements are grouped by participant in the table below. When an
        outreach engagement is logged, the incident will no longer appear in the
        list of outstanding incidents.
      </P>
      <Airtable.EngagementsByParticipants />
    </>
  );
};
