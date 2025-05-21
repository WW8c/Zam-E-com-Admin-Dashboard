import React, { useState } from 'react';
import './ResetPassword.scss';
import { useNavigate } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined ,ArrowRightOutlined} from '@ant-design/icons';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      console.log('Password reset successfully!');
      setError('');
      navigate('/logout');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="title">Reset Password</h2>
      <p className="description">
        Duis sagittis molestie tellus, at eleifend sapien pellentesque quis. Fusce lorem nunc, fringilla sit amet nunc.
      </p>

      {/* Password Input */}
      <div className="form-group password-group">
        <label htmlFor="password" className="label">Password</label>
        <div className="password-input">
          <input
            type={showPassword ? 'password' : 'text'}
            id="password"
            placeholder="8+ characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <span className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone twoToneColor="#FA8232" />}
          </span>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="form-group password-group">
        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
        <div className="password-input">
          <input
            type={showConfirmPassword ? 'password' : 'text'}
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
      {error && <p className="error-message">{error}</p>}
          <span className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeTwoTone twoToneColor="#FA8232" />}
          </span>
        </div>
      {/* Error Message */}
      </div>


      {/* Reset Password Button */}
      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password <ArrowRightOutlined className="arrow" />
      </button>
    </div>
  );
};

export default ResetPassword;
