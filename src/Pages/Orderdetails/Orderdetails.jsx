import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './Orderdetails.scss';
import { product1 } from '../../assets';

const Orderdetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;
  const isDigital = order?.category === 'Digital Products';

  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');

  if (!order) {
    return <p>Order not found</p>;
  }

  const handleStatusUpdate = () => {
    console.log('Updated status:', selectedStatus);
    alert(`Order status updated to "${selectedStatus}"`);
    // Replace with real API call
  };

  return (
    <div className="order-details">
      <div className="header3">
        <ArrowLeftOutlined className="back-icon" onClick={() => navigate(-1)} />
        <div>
          <h2 className="title">Order details</h2>
          <p className="breadcrumb">Orders / Order details</p>
        </div>
      </div>

   
      {/* ========== COMMON ORDER INFO ========== */}
      <div className="card">
        <div className="row">
          <div className="box">
            <p className="label">Product</p>
            <div className="info-box">
              <img src={product1} alt="product" />
              <span>{order.product}</span>
            </div>
          </div>
          <div className="box">
            <p className="label">Customer</p>
            <div className="info-box">
              <img
                src={order.customerImg || `https://i.pravatar.cc/100?u=${order.orderedBy}`}
                alt="customer"
              />
              <span>{order.orderedBy}</span>
            </div>
          </div>
        </div>

    <div className="row">
  {!isDigital && (
    <div className="box">
      <p className="label">Quantity</p>
      <div className="input-box">{order.quantity}</div>
    </div>
  )}
  <div className="box">
    <p className="label">Category</p>
    <div className="input-box">{order.category}</div>
  </div>
</div>


        <div className="row">
          <div className="box">
            <p className="label">SKU</p>
            <div className="input-box">{order.sku}</div>
          </div>
          <div className="box">
            <p className="label">Price</p>
            <div className="input-box">${order.price?.toFixed(2)}</div>
          </div>
        </div>

        <div className="row">
          <div className="box full">
            <p className="label">Phone number</p>
            <div className="input-box">{order.phone || '+61 00 000 0000'}</div>
          </div>
        </div>

     {!isDigital && (
  <div className="row">
    <div className="box full">
      <p className="label">Delivery address</p>
      <div className="input-box">{order.address || '123 Main St, Anytown, USA'}</div>
    </div>
  </div>
)}

   {/* ========== DIGITAL PRODUCTS ========== */}
      {order.category === 'Digital Products' ? (
        <div className="digital-packages">
          {/* <h3>Digital Product Packages</h3>  */}
          {['Basic'].map((level) => {
            const lower = level.toLowerCase();
            return (
              <div key={level} className="digital-product-section">
                <h4>{level} Package</h4>
                <div className="row">
                  <div className="box">
                    <p className="label">Regular Price</p>
                    <div className="input-box">${order[`${lower}Price`] ?? 'N/A'}</div>
                  </div>
                  <div className="box">
                    <p className="label">Sale Price</p>
                    <div className="input-box">${order[`${lower}Sale`] ?? 'N/A'}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="box full">
                    <p className="label">Description</p>
                    <div className="input-box">{order[`${lower}Desc`] ?? 'N/A'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // ========== NON-DIGITAL PRODUCTS ==========
        <div className="non-digital-info">
          {/* <h3>Product Information</h3> */}
          <div className="row">
            <div className="box">
              <p className="label">Brand</p>
              <div className="input-box">{order.brand}</div>
            </div>
            <div className="box">
              <p className="label">Regular Price</p>
              <div className="input-box">${order.regularPrice}</div>
            </div>
          </div>
          <div className="row">
            <div className="box">
              <p className="label">Discount Price</p>
              <div className="input-box">${order.discountPrice}</div>
            </div>
            <div className="box">
              <p className="label">Weight</p>
              <div className="input-box">{order.weight} kg</div>
            </div>
          </div>
          <div className="row">
            <div className="box">
              <p className="label">Stock</p>
              <div className="input-box">{order.stock} units</div>
            </div>
            <div className="box">
              <p className="label">Sizes</p>
              <div className="input-box">{order.sizes?.join(', ') || 'N/A'}</div>
            </div>
          </div>
          <div className="row">
            <div className="box full">
              <p className="label">Storages</p>
              <div className="input-box">{order.storages?.join(', ') || 'N/A'}</div>
            </div>
          </div>
          <div className="row">
            <div className="box full">
              <p className="label">Description</p>
              <div className="input-box">{order.description}</div>
            </div>
          </div>
        </div>
      )}

        <div className="row">
          <div className="box full">
            <p className="label">Status</p>
            <div className="status-options">
              {['Pending', 'Approved', 'Rejected', 'On the way', 'Delivered'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="status"
                    value={opt}
                    checked={selectedStatus === opt}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button className="update" onClick={handleStatusUpdate}>Update status</button>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;
