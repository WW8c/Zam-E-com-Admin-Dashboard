import React, { useState, useRef ,useEffect} from 'react';
import {
  Input,
  Typography,
  Upload,
  Select,
  Divider,
  Space,
  Button,
  Form,
  message,
  InputNumber,
  Table,
  Popconfirm,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import {
  SearchOutlined,
  PlusOutlined,
  InboxOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './Products.scss';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this utility function at the top of your component
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else {
      resolve(file.preview); // For existing images during editing
    }
  });
};
const initialData = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  productName: `Product ${i + 1}`,
  sku: `SKU-000${i + 1}`,
  category: ['Digital Products', 'Electronics', 'Stationary', 'Toys & Games'][i % 4],
  images: [],
  sizes: [],
  storages: [],
  tags: [],
  // Add other fields as needed
}));
const categoryOptions = [
  { label: 'Digital Products', value: 'Digital Products' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Stationary', value: 'Stationary' },
  { label: 'Toys & Games', value: 'Toys & Games' },
];

const Products = () => {
  const [fileList, setFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const sizeInputRef = useRef(null);
  const [storages, setStorages] = useState([]);
  const [storageInput, setStorageInput] = useState('');
  const storageInputRef = useRef(null);
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
const [data, setData] = useState([]);

  const [editingKey, setEditingKey] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
const navigate = useNavigate();
const location = useLocation(); // Added for URL-based form state
const handleDelete = async (key) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${key}`);
    toast.success('Product deleted successfully');
    await fetchProducts();
  } catch (error) {
    toast.error('Failed to delete product');
  }
};

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setData(res.data.map(product => ({ ...product, key: product._id })));
    } catch (err) {
      toast.error('Failed to load products');
    }
  };
  fetchProducts();
}, []);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (params.get("form") === "add") {
    setShowForm(true);
  } else {
    setShowForm(false);
  }
}, [location]);
  const props = {
    accept: 'image/*',
    multiple: true,
    fileList,
    beforeUpload: () => false,
    onChange(info) {
      const newFiles = info.fileList.map((file) => {
        if (!file.url && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });
      setFileList(newFiles);
    },
    onRemove(file) {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    itemRender: (originNode, file) => {
      return React.cloneElement(originNode, {
        href: 'javascript:void(0);',
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
      });
    },
    listType: 'picture',
    height: 200,
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const [searchText, setSearchText] = useState('');


  const handleSizeChange = (value) => {
    setSizes(value);
  };

  const addSize = (e) => {
    e.preventDefault();
    const trimmed = sizeInput.trim();
    if (!trimmed || sizes.includes(trimmed)) return;
    setSizes((prev) => [...prev, trimmed]);
    setSizeInput('');
    setTimeout(() => sizeInputRef.current?.focus(), 0);
  };

  const handleStorageChange = (value) => {
    setStorages(value);
  };

  const addStorage = (e) => {
    e.preventDefault();
    const trimmed = storageInput.trim();
    if (!trimmed || storages.includes(trimmed)) return;
    setStorages((prev) => [...prev, trimmed]);
    setStorageInput('');
    setTimeout(() => storageInputRef.current?.focus(), 0);
  };
const editProduct = (key) => {
  // key is now the MongoDB _id
  const product = data.find((item) => item.key === key);
  if (!product) return;

  const initialFiles = product.images?.map((img, index) => ({
    uid: `-${index}`,
    name: `image-${index}.png`,
    status: 'done',
    preview: img,
  })) || [];

  form.setFieldsValue({
    ...product,
    sizes: product.sizes,
    storages: product.storages,
  });

  setFileList(initialFiles);
  setCategory(product.category);
  setSizes(product.sizes || []);
  setStorages(product.storages || []);
  setTags(product.tags || []);
  setEditingKey(product._id); // Use _id here!
  navigate(`${location.pathname}?form=add`, { replace: false });
  setShowForm(true);
};

const fetchProducts = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/products');
    setData(res.data.map(product => ({ ...product, key: product._id })));
  } catch (err) {
    toast.error('Failed to refresh products');
  }
};

 // Update handleFinish to be async
const handleFinish = async (values) => {
  try {
    const imageData = await Promise.all(
      fileList.map(file => getBase64(file))
    );
    const productData = {
      ...values,
      images: imageData,
      sizes,
      storages,
      tags,
    };

    if (editingKey !== null) {
      await axios.put(`http://localhost:5000/api/products/${editingKey}`, productData);
      toast.success('Product updated successfully!');
    } else {
      await axios.post('http://localhost:5000/api/products', productData);
      toast.success('Product added successfully!');
    }
    await fetchProducts();
    form.resetFields();
    setFileList([]);
    setEditingKey(null);
    setShowForm(false);
  } catch (error) {
    toast.error('Failed to save product. Please try again.');
  }
};
  const handleFinishFailed = () => {
    toast.error('Please complete all required fields.');
  };

const toggleForm = () => {
  form.resetFields();
  setEditingKey(null);
  setCategory('');
 if (!showForm) {
   // Open form: add ?form=add to URL
    navigate(`${location.pathname}?form=add`, { replace: false });
    setShowForm(true);
  } else {
    // Close form: remove query param
    navigate(location.pathname, { replace: false });
    setShowForm(false);
  }
};
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
    <Button
          type="link"
          icon={<EyeOutlined style={{ color: '#1890ff', cursor: 'pointer', fontSize: '16px' }} />}
          onClick={() => navigate(`/products/${record.key}`, { state: { product: record } })}
        />
          <Button
            type="link"
            icon={<EditOutlined style={{ color: '#1890ff', cursor: 'pointer', fontSize: '18px' }} />}
            onClick={() => editProduct(record.key)}
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="product-form-container">
      {!showForm && (
        <>
          <div
            className="header-actions"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' ,gap:'20px'}}
          >
      <Input
  placeholder="Search Products"
  prefix={<SearchOutlined />}
  size="large"
  allowClear
  style={{ width: 300 }}
  value={searchText}
  onChange={e => setSearchText(e.target.value)}
/>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={toggleForm}
              style={{
                padding: '0 16px',
                fontSize: '16px',
              }}
            >
              Add Products
            </Button>
          </div>
 <Table
            columns={columns}
            dataSource={data.filter((item) =>
              Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )}
            pagination={{ pageSize: 10 }}
            style={{ marginTop: 24 }}
            scroll={{ x: 'max-content' }}
            rowKey="_id"
          />

        </>
      )}

      {showForm && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <div className="form-flex-layout">
            <div className="form-left">
         <div className="form-header" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
  <ArrowLeftOutlined
    onClick={toggleForm}
    style={{ fontSize: '16px', cursor: 'pointer', marginRight: 10 }}
  />
  <Title level={4} style={{ margin: 0 }}>Product Information</Title>
</div>

              <Form.Item
                name="productName"
                label="Product Name"
                rules={[{ required: true, message: 'Product name is required' }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                name="sku"
                label="SKU"
                rules={[{ required: true, message: 'SKU is required' }]}
              >
                <Input placeholder="Enter SKU" />
              </Form.Item>
   <Form.Item label="Tags" name="tags" initialValue={editingProduct ? editingProduct.tags : []}>
                <Select
                  mode="tags"
                  placeholder="Add or remove tags"
                  value={tags}
                  onChange={setTags}
                  tokenSeparators={[',']}
                />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                  value={category}
                />
              </Form.Item>

              {/* Your original conditional form sections for category */}
              {category === 'Digital Products' && (
                <>
                  {['Basic', 'Standard', 'Premium'].map((level) => (
                    <div key={level} className="digital-product-section">
                      <Title level={5}>{level} Package</Title>
                      <div className="form-item" style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item
                          name={`${level.toLowerCase()}Price`}
                          style={{ flex: 1 }}
                          rules={[{ required: true, message: 'Regular Price is required' }]
                          }
                        >
                          <InputNumber min={0} placeholder="Regular Price" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          name={`${level.toLowerCase()}Sale`}
                          style={{ flex: 1 }}
                          rules={[{ required: true, message: 'Sale Price is required' }]}
                        >
                          <InputNumber min={0} placeholder="Sale Price" style={{ width: '100%' }} />
                        </Form.Item>
                      </div>
                      <Form.Item
                        name={`${level.toLowerCase()}Desc`}
                        rules={[{ required: true, message: 'Description is required' }]}
                      >
                        <TextArea
                          placeholder="Enter product description"
                          rows={4}
                          style={{ height: 120, resize: 'none' }}
                        />
                      </Form.Item>
                    </div>
                  ))}
                </>
              )}

              {category !== 'Digital Products' && category !== '' && (
                <div className="non-digital-product-section">
                  <Form.Item
                    name="brand"
                    rules={[{ required: true, message: 'Brand is required' }]}
                  >
                    <Input placeholder="Brand" />
                  </Form.Item>

                  <div className="form-item" style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      name="regularPrice"
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Regular Price is required' }]}
                    >
                      <InputNumber min={0} placeholder="Regular Price" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      name="discountPrice"
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Discounted Price is required' }]}
                    >
                      <InputNumber min={0} placeholder="Discounted Price" style={{ width: '100%' }} />
                    </Form.Item>

                  </div>

                  <div className="form-item" style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      name="weight"
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Weight is required' }]}
                    >
                      <InputNumber min={0} placeholder="Weight" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                      name="stock"
                      style={{ flex: 1 }}
                      rules={[{ required: true, message: 'Stock is required' }]}
                    >
                      <InputNumber min={0} placeholder="Stock" style={{ width: '100%' }} />
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <Select
                      mode="multiple"
                      placeholder="Add custom sizes"
                      value={sizes}
                      onChange={handleSizeChange}
                      popupRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                              placeholder="Add custom size"
                              ref={sizeInputRef}
                              value={sizeInput}
                              onChange={(e) => setSizeInput(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addSize}>
                              Add size
                            </Button>
                          </Space>
                        </>
                      )}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Select
                      mode="multiple"
                      placeholder="Add storage locations"
                      value={storages}
                      onChange={handleStorageChange}
                      popupRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                              placeholder="Add custom storage"
                              ref={storageInputRef}
                              value={storageInput}
                              onChange={(e) => setStorageInput(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addStorage}>
                              Add storage
                            </Button>
                          </Space>
                        </>
                      )}
                    />
                  </Form.Item>
                  <Form.Item
  name="description"
  rules={[{ required: true, message: 'Description is required' }]}
>
  <TextArea
    placeholder="Enter product description"
    rows={4}
    style={{ height: 120, resize: 'none' }}
  />
</Form.Item>

                </div>
              )}
                <Form.Item>
            <button className="submit-btn" htmlType="submit">
              Submit
            </button>
            <button style={{ marginLeft: "12px"}} className='cancel-btn' onClick={toggleForm}>
              Cancel
            </button>
          </Form.Item>
            </div>

            <div className="form-right">
              <Title level={4}>Product Gallery</Title>
              <Dragger {...props} >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Drop your images here, or <u>browse</u>
                </p>
                <p className="ant-upload-hint">Supports multiple image uploads</p>
              </Dragger>
            </div>
          </div>

          {/* <Form.Item>
            <button className="submit-btn" htmlType="submit">
              Submit
            </button>
            <button style={{ marginLeft: "12px"}} className='cancel-btn' onClick={toggleForm}>
              Cancel
            </button>
          </Form.Item> */}
        </Form>
      )}
        <ToastContainer />
    </div>
  );
};

export default Products;
