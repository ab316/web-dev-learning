import './login.css';

const Login = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">You're new time-waster</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="email" className="loginInput" placeholder="Email" />
            <input type="password" className="loginInput" placeholder="Password" />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">Create a New Accout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
