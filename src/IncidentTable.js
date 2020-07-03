import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import DataTable from './DataTable';

const columns = [
  {
    field: 'id',
    title: 'View',
    sorting: false,
    hidden: true,
  },
  {
    field: 'participantId',
    title: 'Participant',
    hidden: true,
    detail: true,
  },
  { field: 'firstName', title: 'First Name', searchable: true },
  { field: 'lastName', title: 'Last Name', searchable: true },
  { field: 'dateOfRequest', title: 'Date of Request', type: 'date' },
  { field: 'location', title: 'Location', searchable: true },
  { field: 'pointOfContact', title: 'Point of Contact' },
  { field: 'receivedNarcan', title: 'Received Narcan', type: 'boolean' },
  { field: 'notes', title: 'Notes', hidden: true, detail: true },
  { field: 'status', title: 'Status', hidden: true },
];

export default () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(
    () =>
      db.collection('incidents').onSnapshot(snapshot => {
        const incidents = [];
        snapshot.forEach(doc => {
          incidents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setIncidents(incidents);
      }),
    []
  );

  return (
    <DataTable columns={columns} rows={incidents} collectionName="incident" />
  );
};
