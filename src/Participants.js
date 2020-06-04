import React from 'react';
import { P } from './widgets';
import RecordParticipantForm from './RecordParticipantForm';
import ParticipantTable from './ParticipantTable';

export default () => {
  return (
    <>
      <P>
        Anyone that recieves help from WROC is a participant. Incidents and
        engagements are attached to partipicipants. Use the form below to add a
        new participant. Only information that is specific to the participant,
        such as their name and housing status, are included in the data.
      </P>
      <div
        style={{
          width: '50%',
          marginLeft: '5%',
          marginTop: '5%',
          marginBottom: '5%',
        }}
      >
        <RecordParticipantForm />
      </div>
      <P>
        Once a participant is added to the system, they will appear in the table
        below.
      </P>
      <ParticipantTable />
    </>
  );
};
