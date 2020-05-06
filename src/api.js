import { v4 as uuidv4 } from 'uuid';

const PARTICIPANTS_KEY = 'participants';
const ENGAGEMENTS_KEY = 'engagements';
const INCIDENTS_KEY = 'incidents';

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const read = key => {
  JSON.parse(localStorage.getItem(key));
};

const load = key => {
  try {
    return read(key);
  } catch (e) {
    console.error(`Couldn't load ${key} from local storage`);
    return {};
  }
};

const crudStub = storageKey => {
  const collection = load(storageKey);
  return {
    async getAll() {
      return collection;
    },
    async get(id) {
      return collection[id];
    },
    async create(entityModel) {
      const entity = { id: uuidv4(), ...entityModel };
      collection[entity.id] = entity;
      write(storageKey, collection);
      return entity;
    },
    async update(entity) {
      const updated = { ...collection[entity.id], ...entity };
      collection[entity.id] = updated;
      write(storageKey, collection);
      return updated;
    },
    async delete(entity) {
      delete collection[entity.id];
      write(storageKey, collection);
    },
  };
};

export default {
  participants: crudStub(PARTICIPANTS_KEY),
  incidents: crudStub(INCIDENTS_KEY),
  engagements: crudStub(ENGAGEMENTS_KEY),
};
