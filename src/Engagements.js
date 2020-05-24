import React from 'react';
import { P } from './widgets';
import RecordEngagementForm from './RecordEngagementForm';

export default () => {
  return (
    <>
      <P>
        Engagements are interactions between WROC and a participant. Overdose
        outreach responses are recorded as engagements, as are interactions at
        drop-in hours.
      </P>
      <RecordEngagementForm />
    </>
  );
};
