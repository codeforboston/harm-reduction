import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import TableContainer from './tables/TableContainer';

const participantMeta = [
  {
    name: 'id',
    label: 'View',
    sortable: false,
    display: false,
    link: id => `/participant/view/${id}`,
  },
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'ethnicity', label: 'Ethnicity' },
  { name: 'stateOfChange', label: 'State of Change' },
  { name: 'newOrExisting', label: 'New or Existing' },
  { name: 'age', label: 'Age' },
  { name: 'gender', label: 'Gender' },
];

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
        setParticipants(participants);
      }),
    []
  );

  return (
    <TableContainer
      columns={participantMeta}
      rows={participants}
      collectionName="participant"
    />
  );
};
