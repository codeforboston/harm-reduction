import React, { useEffect } from 'react';
import { auth } from './Database/Firebase';

export default () => {
  useEffect(() => {
    auth.signOut();
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};
