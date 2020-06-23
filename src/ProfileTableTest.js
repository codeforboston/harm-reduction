import React, { useEffect, useState } from 'react';
import { db } from './Firebase';



const column = (name, getter) => ({ name, getter });
const columns = [
  column('ID', row => row.id),
  column('First Name', row => row.firstName),
  column('Last Name', row => row.lastName),
];


const fullName = participant =>
  `${participant.firstName} ${participant.lastName}`.trim();

export default () => {
  const [participants, setParticipants] = useState([]);

  useEffect(
    () =>
      db.collection('participants').onSnapshot(snapshot => {
        const participants = [];
        snapshot.forEach(doc => {
          participants.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        participants.sort((a, b) => fullName(a).localeCompare(fullName(b)));
        setParticipants(participants);
      }),
    []
  );

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {participants.map(participant => (
          <tr key={participant.id}>
            {columns.map((column, index) => (
              <td key={index}>{column.getter(participant)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
