import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import TableContainer from './tables/TableContainer';

const participantMeta = [
  {
    fieldName: 'id',
    labelName: 'ID',
    isKey: true,
    sortable: false,
    display: false,
  },
  { fieldName: 'firstName', labelName: 'First Name' },
  { fieldName: 'lastName', labelName: 'Last Name' },
  { fieldName: 'ethnicity', labelName: 'Ethnicity' },
  { fieldName: 'stateOfChange', labelName: 'State of Change' },
  { fieldName: 'newOrExisting', labelName: 'New or Existing' },
  { fieldName: 'age', labelName: 'Age' },
  { fieldName: 'gender', labelName: 'Gender' },
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

  return <TableContainer fields={participantMeta} rows={participants} />;
};
