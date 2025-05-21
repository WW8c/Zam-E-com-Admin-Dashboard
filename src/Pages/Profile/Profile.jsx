import React, { useState } from 'react';
import { Input, Divider, Form, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Profile.scss';

const Profile = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);
  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      {/* Profile Section */}
      <div className="profile-container">
        <h2 className="profile-heading">Account Settings</h2>
        <Divider />

        <div className="profile-content">
          {/* Left: Profile Image */}
          <div className="profile-img-section">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>

            <Modal
              open={previewOpen}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          {/* Right: Basic Info Form */}
          <div className="profile-basic-info">
        <Form layout="vertical">
  <Form.Item
    label="First Name"
    name="firstName"
    rules={[{ required: true, message: 'Please enter your first name!' }]}
  >
    <Input placeholder="Kevin Gilbert" />
  </Form.Item>

  <Form.Item
    label="Last Name"
    name="lastName"
    rules={[{ required: true, message: 'Please enter your last name!' }]}
  >
    <Input placeholder="Smith" />
  </Form.Item>

  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Please enter your email!' },
      { type: 'email', message: 'Please enter a valid email address!' },
    ]}
  >
    <Input placeholder="Kevin.gilbert@gmail.com" />
  </Form.Item>

  <Form.Item>
    <button type="submit" className="custom-save-btn">
      Save Changes
    </button>
  </Form.Item>
</Form>

          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="change-password-container">
        <h3 className="change-password-heading">Change Password</h3>
        <Divider />
        <Form layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password placeholder="At least 8 characters" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
          >
            <Input.Password placeholder="8+ characters" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <button className="custom-save-btn">Change Password</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
