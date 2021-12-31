import React, {useRef} from 'react';
import {CircularProgress} from '@material-ui/core';
import useAuth from 'context/auth/AuthContext';
import {login} from 'apiCalls';
import './login.css';

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const {user, isLoading, error, dispatch} = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(
      {
        email: email.current?.value as string,
        password: password.current?.value as string,
      },
      dispatch,
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">You're new time-waster</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input type="email" className="loginInput" placeholder="Email" ref={email} required />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength={6}
            />
            <button className="loginButton" disabled={isLoading}>
              {isLoading ? <CircularProgress style={{color: 'white'}} size="30px" /> : 'Log In'}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton" disabled={isLoading}>
              Create a New Accout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
