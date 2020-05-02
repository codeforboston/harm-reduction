import React, { useEffect, useState } from 'react';
import { db } from './Firebase';

export default () => {
  const [participants, setParticipants] = useState([]);

  useEffect(
    () =>
      db.collection('participants').onSnapshot(snapshot => {
        const participants = [];
        snapshot.forEach(doc => {
          participants.push(JSON.stringify(doc.data()));
        });
        setParticipants(participants);
      }),
    []
  );

  return (
    <div>
      {participants.map(participant => (
        <p key={participant}>{participant}</p>
      ))}
    </div>
  );
};
