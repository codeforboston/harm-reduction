export const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT';
export const updateParticipant = ({ id, firstName, lastName, age }) => {
  return {
    type: UPDATE_PARTICIPANT,
    participant: { id, firstName, lastName, age },
  };
};

export const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';
export const deleteParticipant = ({ id }) => {
  return {
    type: DELETE_PARTICIPANT,
    participant: { id },
  };
};

export const UPDATE_INCIDENT = 'UPDATE_INCIDENT';
export const DELETE_INCIDENT = 'DELETE_INCIDENT';

export const UPDATE_ENGAGEMENT = 'UPDATE_PARTICIPANT';
export const DELETE_ENGAGEMENT = 'DELETE_ENGAGEMENT';
