import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import TableContainer from './tables/TableContainer';

const incidentMeta = [
  { name: 'id', label: 'ID', type: 'link', link: id => `/incident/show/${id}` },
  {
    name: 'participantId',
    label: 'Participant',
    type: 'link',
    link: id => `/participant/show/${id}`,
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
      collectionName="incident"
      columns={incidentMeta}
      rows={incidents}
    />
  );
};
