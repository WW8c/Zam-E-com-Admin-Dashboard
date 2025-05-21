import React, { useState } from 'react';
import './Logout.scss';
import { EyeTwoTone, EyeInvisibleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Logout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address.');
        isValid = false;
      }
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      isValid = false;
    }

    if (!isValid) return;

    // Proceed with login logic
    console.log('Signed in successfully:', { email, password });
  };

  return (
    <div className="login-box">
      <h2 className="form-heading">Sign In</h2>
      <form className="form" onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className="form-group">
          <div className="label-row">
            <label>Password</label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password
            </Link>
          </div>
          <div className="password-input">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeTwoTone twoToneColor="#FA8232" />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <button type="submit" className="btn-signin">
          SIGN IN <ArrowRightOutlined className="arrow" />
        </button>
      </form>
    </div>
  );
};

export default Logout;
