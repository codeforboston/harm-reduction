import React, { useEffect, useState } from 'react';
import { db } from './API';
import DataTable from './DataTable';

const columns = [
  {
    field: 'id',
    title: 'Participant',
    sorting: false,
    hidden: true,
  },
  { field: 'firstName', title: 'First Name', searchable: true },
  { field: 'lastName', title: 'Last Name', searchable: true },
  { field: 'ethnicity', title: 'Ethnicity' },
  { field: 'stateOfChange', title: 'State of Change' },
  { field: 'newOrExisting', title: 'New or Existing' },
  { field: 'age', title: 'Age' },
  { field: 'gender', title: 'Gender' },
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
    <DataTable
      columns={columns}
      rows={participants}
      collectionName="participant"
    />
  );
};
