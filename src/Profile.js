import React from 'react';
// import { P } from './widgets';
import RecordProfileForm from './RecordProfileForm';
import ProfileTable from './ProfileTable';

// const { user } = useAuthState()
// const userDoc = db.collection('users').doc(user.uid)

export default () => {

  /*   const testProfile = async event => {
      event.preventDefault();
      event.stopPropagation();
  
      try {
        await db.collection('users').add({
          firstName: 'Bob',
          // firstName: state.firstName,
          lastName: 'Jones',
          // lastName: state.lastName,
        });
        update({ status: 'Submitted!' });
      } catch (e) {
        update({ status: 'Error! ' + e });
      } */

  // Read the current information in the document
  // const currentInfo = await userDoc.read();

  // Update profile information
  // await userDoc.update

  return (
    <>
      <RecordProfileForm />
      <ProfileTable />
    </>
  );
};
