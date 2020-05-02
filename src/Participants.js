import React from 'react';
import Airtable from './Airtable';
import { P } from './widgets';
import RecordParticipantForm from './RecordParticipantForm';

export default () => {
  return (
    <>
      <P>
        Anyone that recieves help from WROC is a participant. Incidents and
        engagements are attached to partipicipants. Use the form below to add a
        new participant. Only information that is specific to the participant,
        such as their name and housing status, are included in the data.
      </P>
      <RecordParticipantForm />
      <P>
        Once a participant is added to the system, they will appear in the table
        below. Clicking on a participant will show detailed personal information
        and associated incidents and engagements.
      </P>
      <Airtable.Participants useCardLayout showRefresh />
    </>
  );
};
