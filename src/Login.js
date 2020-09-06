import React, { useReducer, useEffect } from 'react';
import { auth } from './API';
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
      .catch(({ code }) => update({ error: getLoginErrorMessage(code) }))
      .finally(() => update({ isSigningIn: false }));
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .catch(({ code }) => update({ error: getRegistrationErrorMessage(code) }))
      .finally(() => update({ isSigningIn: false }));
  };

  return (
    <Form onSubmit={login} style={{ marginBottom: '20px' }}>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
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
        <Form.Label>Password:</Form.Label>
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
        <br />
        <Button variant="primary" type="submit" disabled={state.isSigningIn}>
          Log In
          <br />
          (existing users)
        </Button>
        <Button
          className="register-button"
          variant="primary"
          disabled={state.isSigningIn}
          onClick={register}
        >
          Register
          <br />
          (first-time users)
        </Button>
      </Form.Group>
      {state.error.other && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {state.error.other}
        </div>
      )}
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

const getLoginErrorMessage = code => {
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

const getRegistrationErrorMessage = code => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { email: 'Email already in use' };
    case 'auth/invalid-email':
      return { email: 'Invalid email' };
    case 'auth/operation-not-allowed':
      return { email: 'New accounts not allowed' };
    case 'auth/weak-password':
      return { password: 'Password is too weak' };
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
