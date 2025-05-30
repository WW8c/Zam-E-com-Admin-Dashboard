import { useState } from 'react';
import { Button, Spin, Modal, Alert } from 'antd';
import { LogoutOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './LogoutConfirm.scss';

const LogoutConfirmation = ({ onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
 const handleLogout = () => {
 console.log('Logging out...');
  localStorage.removeItem('authToken'); // Clear the auth token!
  setIsLoggingOut(true);
  setTimeout(() => {
    navigate('/logout', { replace: true });
  }, 1500);
};

  const handleCancel = () => {
    if (onClose) onClose(); // Close the modal using parent-provided method
  };

  return (
    <Modal
      title="Logout Confirmation"
      open={true} // Always open when rendered
      onCancel={handleCancel}
      footer={null}
      centered
      aria-labelledby="logout-confirmation-title"
      aria-describedby="logout-confirmation-description"
      closeIcon={<CloseOutlined aria-label="Close confirmation dialog" />}
    >
      <div role="alertdialog" aria-labelledby="logout-confirmation-title">
        <Alert
          message={
            <span id="logout-confirmation-title">
              Are you sure you want to logout?
            </span>
          }
          description={
            <span id="logout-confirmation-description">
              You will be redirected to the login page after logout.
            </span>
          }
          type="warning"
          showIcon
          className="confirmation-alert"
        />

        <div className="confirmation-actions">
          {isLoggingOut ? (
            <Spin
              indicator={<LogoutOutlined spin />}
              tip="Logging out..."
              size="large"
              aria-label="Logging out, please wait"
            />
          ) : (
            <div className="button-group">
              <Button
                type="primary"
                danger
                onClick={handleLogout}
                icon={<LogoutOutlined />}
                aria-label="Confirm logout"
                loading={isLoggingOut}
              >
                Yes, Logout Now
              </Button>
              <Button
                onClick={handleCancel}
                aria-label="Cancel logout and return to previous page"
              >
                Stay Logged In
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmation;
