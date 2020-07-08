import { db } from './Firebase';

export const addParticipant = async participant => {
  try {
    await db.collection('participants').add({
      firstName: participant.firstName,
      lastName: participant.lastName,
      stateOfChange: participant.stateOfChange,
      newOrExisting: participant.newOrExisting,
      age: participant.age,
      gender: participant.gender,
      ethnicity: participant.ethnicity,
    });
    return 'Submitted!';
  } catch (e) {
    return 'Error! ' + e;
  }
};

export const addIncident = async incident => {
  try {
    await db.collection('incidents').add({
      participantId: incident.participantId,
      firstName: incident.firstName,
      lastName: incident.lastName,
      pointOfContact: incident.pointOfContact,
      location: incident.location,
      dateOfRequest: incident.dateOfRequest,
      receivedNarcan: incident.receivedNarcan,
      notes: incident.notes,
    });
    return 'Submitted!';
  } catch (e) {
    return 'Error! ' + e;
  }
};

export const addEngagement = async engagement => {
  try {
    await db.collection('engagements').add({
      participantId: engagement.participantId,
      firstName: engagement.firstName,
      lastName: engagement.lastName,
      associatedIncident: engagement.associatedIncident,
      dateEngaged: engagement.dateEngaged,
      pointPerson: engagement.pointPerson,
      stateOfChange: engagement.stateOfChange,
      needsIdentified: engagement.needsIdentified,
      narcanEnrollment: engagement.narcanEnrollment,
      followUpDate: engagement.followUpDate,
      firstPerson: engagement.firstPerson,
      notes: engagement.notes,
    });
    return 'Submitted!';
  } catch (e) {
    return 'Error! ' + e;
  }
};

export const getParticipantById = async participantId => {
  const participant = await db
    .collection('participants')
    .doc(participantId)
    .get();
  return { id: participant.id, ...participant.data() };
};

export const getIncidentsByParticipantId = async participantId => {
  const incidents = db
    .collection('incidents')
    .where('participantId', '==', participantId);
  const incidentData = await incidents.get().then(ins =>
    ins.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    })
  );
  return incidentData;
};

export const getEngagementsByParticipantId = async participantId => {
  const engagements = db
    .collection('engagements')
    .where('participantId', '==', participantId);
  const engagementData = await engagements.get().then(engagements =>
    engagements.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    })
  );
  return engagementData;
};
