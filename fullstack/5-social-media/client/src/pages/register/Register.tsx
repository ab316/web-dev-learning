import {useRef} from 'react';
import {IRegisterUserRequest} from 'interfaces/user';
import './register.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Submit clicked');
    if (confirmPassword.current?.value !== password.current?.value) {
      confirmPassword.current?.setCustomValidity('Passwords do not match');
    } else {
      const user: IRegisterUserRequest = {
        username: username.current?.value as string,
        email: email.current?.value as string,
        password: password.current?.value as string,
      };

      try {
        axios.post('/auth/register', user);
        navigate('/login');
      } catch (err) {
        console.error('Register error', err);
      }
    }
    // login(
    //   {
    //     email: email.current?.value as string,
    //     password: password.current?.value as string,
    //   },
    //   dispatch,
    // );
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social App</h3>
          <span className="registerDesc">You're new time-waster</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input type="text" className="registerInput" placeholder="User Name" ref={username} required />
            <input type="email" className="registerInput" placeholder="Email" ref={email} required />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              ref={password}
              minLength={6}
              required
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
            />
            <button className="registerButton">Sign Up</button>
            <button className="registerRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
