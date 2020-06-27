import { db } from './Firebase';

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
