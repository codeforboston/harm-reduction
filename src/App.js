import React from 'react';
import './App.css';
import TopBar from './TopBar';
import Content from './Content';
import { useAuthState, AuthStatus } from './Auth';
import Login from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <MainPage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

const MainPage = () => (
  <div className="App">
    <TopBar />
    <Content />
  </div>
);

function PrivateRoute({ children, ...rest }) {
  const { status } = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        switch (status) {
          case AuthStatus.SignedIn:
            return children;
          case AuthStatus.SignedOut:
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            );
          case AuthStatus.Loading:
            return (
              <div className="fullscreen">
                <Spinner animation="border" />
              </div>
            );
          default:
            throw Error(`Unexpected status ${status}`);
        }
      }}
    />
  );
}

export default App;
