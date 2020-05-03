import React from 'react';
import './App.css';
import TopBar from './TopBar';
import Content from './Content';
import { useAuthState } from './Auth';
import Login from './Login';

function App() {
  const { isSignedIn } = useAuthState();

  return !isSignedIn ? (
    <Login />
  ) : (
    <div className="App">
      <TopBar />
      <Content />
    </div>
  );
}

export default App;
