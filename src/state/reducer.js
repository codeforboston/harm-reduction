import {
  DELETE_PARTICIPANT,
  UPDATE_PARTICIPANT,
  DELETE_INCIDENT,
  UPDATE_INCIDENT,
  DELETE_ENGAGEMENT,
  UPDATE_ENGAGEMENT,
} from './actions';
import { cloneDeep } from 'lodash';

export const initialState = {
  participants: {},
  incidents: {},
  engagements: {},
};

const deleteEntity = (state, collectionKey, entity) => {
  const {
    [collectionKey]: { [entity.id]: _, ...entities },
    ...rest
  } = state;

  return { [collectionKey]: entities, ...rest };
};

const updateEntity = (state, collectionKey, entity) => {
  const { [collectionKey]: entities, ...rest } = state;

  return {
    [collectionKey]: {
      ...entities,
      [entity.id]: cloneDeep(entity),
    },
    ...rest,
  };
};

export default (state, action) => {
  switch (action.type) {
    case DELETE_PARTICIPANT:
      return deleteEntity(state, 'participants', action.participant);
    case UPDATE_PARTICIPANT:
      return updateEntity(state, 'participants', action.participant);

    case DELETE_INCIDENT:
      return deleteEntity(state, 'incidents', action.incident);
    case UPDATE_INCIDENT:
      return updateEntity(state, 'incidents', action.incident);

    case DELETE_ENGAGEMENT:
      return deleteEntity(state, 'engagements', action.engagement);
    case UPDATE_ENGAGEMENT:
      return updateEntity(state, 'engagements', action.engagement);

    default:
      throw Error(`Unrecognized action ${action.type}`);
  }
};
