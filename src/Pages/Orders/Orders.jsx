import React, { useState } from 'react';
import { Input, Table, Tag } from 'antd';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Orders.scss';

const Orders = ({ showSearch = true, showPagination = true ,rowLimit}) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleArrowClick = (record) => {
    navigate(`/order-details/${record.id}`, { state: { order: record } });
  };

  const columns = [
        {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Ordered By',
      dataIndex: 'orderedBy',
      key: 'orderedBy',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          Delivered: 'green',
          Pending: 'orange',
          Rejected: 'red',
          'On the way': 'blue',
          Approved: 'purple',
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <ArrowRightOutlined
          style={{ fontSize: '16px', cursor: 'pointer' }}
          onClick={() => handleArrowClick(record)}
        />
      ),
    },
  ];

  const statuses = ['Delivered', 'Pending', 'Rejected', 'On the way', 'Approved'];
  const categories = ['Digital Products', 'Electronics', 'Stationary', 'Toys & Games'];
const data = Array.from({ length: 20 }, (_, index) => {
  const category = categories[index % categories.length];
  const isDigital = category === 'Digital Products';

  return {
    id: `product-${index + 1}`,
    key: index,
    product: `Product ${index + 1}`,
    orderedBy: `Customer ${index + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    category,
    price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
    sku: `SKU-${1000 + index}`,
    status: statuses[index % statuses.length],
    orderDate: `2025-05-${(index % 28) + 1}`,
    type: isDigital ? 'digital' : 'non-digital',
    ...(isDigital
      ? {
          basicPrice: 50,
          basicSale: 45,
          basicDesc: 'Basic package description',
      
        }
      : {
          brand: 'BrandX',
          regularPrice: 79.99,
          discountPrice: 59.99,
          weight: 1.2,
          stock: 25,
          sizes: ['S', 'M', 'L'],
          storages: ['Warehouse A', 'Warehouse B'],
          description: 'Non-digital product description',
        }),
  };
});


  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  // Apply row limit if provided
  const displayedData = rowLimit ? filteredData.slice(0, rowLimit) : filteredData;
  return (
    <div className="orders-container">
  {showSearch && (
  <div className="search-bar">
    <Input
      placeholder="Search orders..."
      allowClear
      prefix={<SearchOutlined />}
      size="large"
      style={{ width: 300 }}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
)}


  <Table
  columns={columns}

     dataSource={displayedData}
  pagination={showPagination ? { pageSize: 10 } : false}
  className="orders-table"
/>
    </div>
  );
};

export default Orders;
