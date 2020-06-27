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

export const editParticipantInfo = async participant => {
  try {
    await db.collection('participants').doc(participant.id).update({
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
