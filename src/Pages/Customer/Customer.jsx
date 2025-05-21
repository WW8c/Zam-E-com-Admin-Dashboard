import React, { useState } from 'react';
import { Input, Table, Popconfirm, message } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import './Customer.scss';

const Customer = () => {
  // Generate sample data (50 rows), now with avatar URL
  const allData = Array(50)
    .fill(null)
    .map((_, index) => ({
      key: index + 1,
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`, // random avatar
      firstName: `FirstName ${index + 1}`,
      lastName: `LastName ${index + 1}`,
      email: `user${index + 1}@example.com`,
      phone: `123-456-789${index}`,
      address: `Address ${index + 1}`,
      country: index % 2 === 0 ? 'USA' : 'Canada',
      state: index % 2 === 0 ? 'California' : 'Ontario',
      zipCode: `9000${index}`,
    }));

  const [data, setData] = useState(allData);
  const [searchText, setSearchText] = useState('');

  // Filter table data on search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = allData.filter((item) =>
      `${item.firstName} ${item.lastName} ${item.email} ${item.address} ${item.country} ${item.state} ${item.zipCode} ${item.phone}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setData(filtered);
  };

  // Delete handler with feedback
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    message.success('Customer deleted successfully');
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <div className="name-cell">
          <img src={record.avatar} alt="avatar" className="avatar" />
          <span>{record.firstName} {record.lastName}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      key: 'address',
      render: (_, record) => (
        <span>
          {record.address}, {record.country}, {record.state}, {record.zipCode}
        </span>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this customer?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ size: 'small' }}
          cancelButtonProps={{ size: 'small' }}
        >
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="customer-page">
      <div className="search-container">
        <Input
          placeholder="Search Customers"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          size="large"
          allowClear
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="key"
      />
    </div>
  );
};

export default Customer;
