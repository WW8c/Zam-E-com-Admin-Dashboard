import React, { useState, useRef } from 'react';
import './Emailverification.scss';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Emailverification = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  
  // State for handling validation errors
  const [error, setError] = useState('');

  // Resend code functionality
  const handleResend = () => {
    console.log('Resend code clicked');
  };

  // Validation and handle verify action
  const handleVerify = () => {
    const code = inputsRef.current.map(input => input.value.trim());

    // Check if any input is empty
    if (code.some(digit => digit === '')) {
      setError('Please fill in all 6 digits.');
      return;
    }

    // Check if all characters are digits
    if (code.some(digit => !/^[0-9]$/.test(digit))) {
      setError('All characters must be digits (0-9).');
      return;
    }

    setError(''); // Clear error if validation passes
    const fullCode = code.join('');
    console.log('Verification Code:', fullCode);
    navigate('/reset-password'); // Replace with actual route
  };

  // Handle change event for each input field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only single-digit input
    if (/^[0-9]$/.test(value)) {
      // Automatically focus the next input if the current one is filled
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      // Clear the input if non-digit is entered
      e.target.value = '';
    }

    // Clear the error message while the user is typing
    setError('');
  };

  // Handle Backspace key press to focus the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="email-verification-container">
      <h2 className="title">Verify Your Email Address</h2>
      <p className="description">
        Nam ultricies lectus a risus blandit elementum. Quisque arcu arcu, tristique a eu in diam.
      </p>

      <div className="form-group">
        <div className="label-row">
          <label className="label">Verification Code</label>
          <span className="resend-link" onClick={handleResend}>Resend Code</span>
        </div>

        <div className="code-input-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="code-box"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        {/* Display the error message below the inputs */}
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="verify-button" onClick={handleVerify}>
        Verify me <ArrowRightOutlined className="arrow" />
      </button>
    </div>
  );
};

export default Emailverification;
