import React from 'react';
import { P } from './widgets';
import RecordEngagementForm from './RecordEngagementForm';
import EngagementTable from './EngagementTable';

export default () => {
  return (
    <>
      <div>
        <P>
          Engagements are interactions between WROC and a participant. Overdose
          outreach responses are recorded as engagements, as are interactions at
          drop-in hours.
        </P>
        <RecordEngagementForm />
      </div>
      <P>
        Once a participant is added to the system, they will appear in the table
        below.
      </P>
      <EngagementTable />
    </>
  );
};
