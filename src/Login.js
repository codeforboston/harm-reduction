import React, { useReducer, useEffect } from 'react';
import { auth } from './Firebase';
import { useHistory, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useAuthState } from './Auth';

export default () => {
  return (
    <div className="fullscreen">
      <div className="login">
        <h1>Harm Reduction</h1>
        <LoginForm />
      </div>
    </div>
  );
};

const LoginForm = () => {
  useSignInRedirect();

  const [state, update] = useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      email: '',
      password: '',
      isSigningIn: false,
      error: {},
    }
  );

  const login = event => {
    event.preventDefault();
    event.stopPropagation();

    update({ isSigningIn: true });
    auth
      .signInWithEmailAndPassword(state.email, state.password)
      .catch(({ code }) => update({ error: getErrorMessage(code) }))
      .finally(() => update({ isSigningIn: false }));
  };

  return (
    <Form onSubmit={login} style={{ marginBottom: '20px' }}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          value={state.email}
          type="text"
          onChange={e => update({ email: e.target.value })}
          isInvalid={!!state.error.email}
        />
        <Form.Control.Feedback type="invalid">
          {state.error.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          value={state.password}
          type="password"
          onChange={e => update({ password: e.target.value })}
          isInvalid={!!state.error.password}
        />
        <Form.Control.Feedback type="invalid">
          {state.error.password}
        </Form.Control.Feedback>
      </Form.Group>
      {state.error.other && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {state.error.other}
        </div>
      )}
      <Button variant="primary" type="submit" disabled={state.isSigningIn}>
        Log In
      </Button>
      {state.isSigningIn && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{
            marginLeft: '10px',
            alignSelf: 'center',
          }}
        />
      )}
    </Form>
  );
};

const getErrorMessage = code => {
  switch (code) {
    case 'auth/invalid-email':
      return { email: 'Invalid email' };
    case 'auth/user-disabled':
      return { email: 'User is disabled' };
    case 'auth/user-not-found':
      return { email: 'User not found' };
    case 'auth/wrong-password':
      return { password: 'Wrong password' };
    default:
      return { other: 'Something went wrong. Please try again later.' };
  }
};

/** Replaces the current page with the target page after successful login. */
const useSignInRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const { user: currentUser } = useAuthState();

  useEffect(() => {
    if (currentUser) {
      let { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    }
  }, [currentUser, history, location.state]);
};
