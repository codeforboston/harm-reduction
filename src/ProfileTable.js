import React, { useEffect, useState } from 'react';
import { db } from './Firebase';

var frankDocRef = db.collection("users").doc("frank");
frankDocRef.set({
  firstName: "Frank",
  lastName: 12
});

const column = (name, getter) => ({ name, getter });
const columns = [
  column('First Name', row => row.firstName),
  column('Last Name', row => row.lastName),
];

const fullName = users =>
  `${users.firstName} ${users.lastName}`.trim();

export default () => {
  const [users, setUsers] = useState([]);

  useEffect(
    () =>
      db.collection('users').onSnapshot(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        users.sort((a, b) => fullName(a).localeCompare(fullName(b)));
        setUsers(users);
      }),
    []
  );

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            {columns.map((column, index) => (
              <td key={index}>{column.getter(user)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
