import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import TableContainer from './tables/TableContainer';

const incidentMeta = [
  {
    name: 'id',
    label: 'View',
    display: false,
    sortable: false,
    link: id => `/incident/view/${id}`,
  },
  {
    name: 'participantId',
    label: 'Participant',
    display: false,
    sortable: false,
    link: id => `/participant/view/${id}`,
  },
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'dateOfRequest', label: 'Date of Request', type: 'date' },
  { name: 'location', label: 'Location' },
  { name: 'pointOfContact', label: 'Point of Contact' },
  { name: 'receivedNarcan', label: 'Received Narcan', type: 'boolean' },
  { name: 'notes', label: 'Notes' },
  { name: 'status', label: 'Status' },
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
    <TableContainer
      columns={incidentMeta}
      rows={incidents}
      collectionName="incident"
    />
  );
};
