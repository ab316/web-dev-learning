import './register.css';

const Register = () => {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social App</h3>
          <span className="registerDesc">You're new time-waster</span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input type="text" className="registerInput" placeholder="User Name" />
            <input type="email" className="registerInput" placeholder="Email" />
            <input type="password" className="registerInput" placeholder="Password" />
            <input type="password" className="registerInput" placeholder="Confirm Password" />
            <button className="registerButton">Sign Up</button>
            <button className="registerRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
