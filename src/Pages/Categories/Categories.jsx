import React, { useState } from 'react';
import { Input, Table, Popconfirm, message, Button, Modal, Form } from 'antd';
import { SearchOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import './Categories.scss';

const Categories = () => {
  // Generate sample category data
  const allData = Array(20)
    .fill(null)
    .map((_, index) => ({
      key: index + 1,
      name: `Category ${index + 1}`,
    }));

  const [data, setData] = useState(allData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = allData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    message.success('Category deleted successfully');
  };

  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        const updatedData = data.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        );
        setData(updatedData);
        message.success('Category updated successfully');
      }else {
        const newCategory = {
          ...values,
          key: data.length ? data[data.length - 1].key + 1 : 1,
        };
        setData([...data, newCategory]);
        message.success('Category added successfully');
      }
      setIsModalVisible(false);
      setEditingRecord(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

const columns = [
  {
    title: 'Category Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    render: (_, record) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <EditOutlined
          style={{ color: '#1890ff', cursor: 'pointer', fontSize: '18px' }}
          onClick={() => showModal(record)}
        />
        <Popconfirm
          title="Are you sure you want to delete this category?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }} />
        </Popconfirm>
      </div>
    ),
  },
];


  return (
    <div className="categories-page">
      <div className="header-actions">
        <Input
          placeholder="Search Categories"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          size="large"
          allowClear
          style={{ width: 300 }}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => showModal()}
        >
          Add Category
        </Button>
      </div>


<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 10 }}
  rowKey="key"
/>


      <Modal
        title={editingRecord ? 'Edit Category' : 'Add Category'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
