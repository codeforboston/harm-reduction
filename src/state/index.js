import React, { useContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

const AppState = React.createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppState.Provider value={[state, dispatch]} children={children} />;
};

export const useAppState = () => {
  return useContext(AppState);
};
