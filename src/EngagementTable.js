import React, { useEffect, useState } from 'react';
import { db } from './API';
import DataTable from './DataTable';

const columns = [
  {
    field: 'id',
    title: 'View',
    hidden: true,
    sorting: false,
  },
  {
    field: 'participantId',
    title: 'Participant',
    hidden: true,
    detail: true,
  },
  { field: 'firstName', title: 'First Name', searchable: true },
  { field: 'lastName', title: 'Last Name', searchable: true },
  {
    field: 'associatedIncident',
    title: 'Associated Incident',
    hidden: true,
    detail: true,
  },
  { field: 'dateEngaged', title: 'Date Engaged', type: 'date' },
  { field: 'pointPerson', title: 'Point Person' },
  { field: 'stateOfChange', title: 'State of Change' },
  { field: 'needsIdentified', title: 'Needs Identified' },
  { field: 'narcanEnrollment', title: 'Narcan Enrollment', type: 'boolean' },
  { field: 'followUpDate', title: 'Follow Up Date', type: 'date' },
  { field: 'firstPerson', title: 'First Person', type: 'boolean' },
  { field: 'notes', title: 'Notes', hidden: true, detail: true },
];

export default () => {
  const [engagements, setEngagements] = useState([]);

  useEffect(
    () =>
      db.collection('engagements').onSnapshot(snapshot => {
        const engagements = [];
        snapshot.forEach(doc => {
          engagements.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEngagements(engagements);
      }),
    []
  );

  return (
    <DataTable
      columns={columns}
      rows={engagements}
      collectionName="engagement"
    />
  );
};
