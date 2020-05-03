import React from 'react';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { auth, EmailAuthProvider } from './Firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
};

export default () => (
  <div>
    <p>Please sign-in:</p>
    <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  </div>
);
