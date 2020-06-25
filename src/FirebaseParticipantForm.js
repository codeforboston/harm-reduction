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

//Participant constants

export const stateOfChange = {
  default: 'Not Decided',
  options: [
    'Not Decided',
    'Precontemplation',
    'Contemplation',
    'Preparation',
    'Action',
    'Maintenance',
  ],
};

export const newOrExisting = {
  default: 'New',
  options: ['New', 'Existing'],
};

export const age = {
  default: 'Not Answered',
  options: [
    'Not Answered',
    '0 - 4',
    '5 - 11',
    '12 - 14',
    '15 - 17',
    '18 - 20',
    '21 - 24',
    '25 - 44',
    '45 - 64',
    '65+',
  ],
};

export const gender = {
  default: 'Not Answered',
  options: ['Not Answered', 'male', 'female', 'other'],
};

export const ethnicity = {
  default: 'Not Answered',
  options: ['Not Answered', 'Non-Hispanic', 'Hispanic'],
};

export const race = {
  default: 'Not Answered',
  options: [
    'Not Answered',
    'American Indian/Alaskan',
    'Asian',
    'African American/Black',
    'Caucasian/White',
    'More Than One Race',
    'Native Hawaiian/Pacific Islander',
  ],
};
