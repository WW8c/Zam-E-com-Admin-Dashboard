import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    // If valid, navigate to verification page
    navigate('/verify-code');
  };

  return (
    <div className="forgot-password-container">
      <h2 className="title">Forget Password</h2>
      <p className="description">
        Enter the email address or mobile phone number associated with your Clicon account.
      </p>

      <div className="form-group">
        <label htmlFor="email" className="label">Email Address</label>
        <input
          type="text"
          id="email"
          placeholder="ID..."
          className={`input ${error ? 'input-error' : ''}`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="send-code-button" onClick={handleSendCode}>
        Send Code <ArrowRightOutlined className="arrow" />
      </button>

      <div className="auth-links">
        <p>
          Already have account?{' '}
          <Link to="/logout"  className="link">Sign In</Link>
        </p>
      </div>
      <hr className="line" />
      <p className="help-text">
        You may contact <span style={{ color: "#FA8232" }}>Customer Service</span> for help restoring access to your account.
      </p>
    </div>
  );
};

export default ForgotPassword;
