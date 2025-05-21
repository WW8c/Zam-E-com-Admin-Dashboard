import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import {
  Typography,
  Image,
  Row,
  Col,
  Divider,
  Tag,
  Card,
  Descriptions,
  Tabs
} from 'antd';
import './ProductDetails.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.product;
const navigate = useNavigate();
  if (!product) return <div className="product-details__error">Product not found</div>;

  const isDigital = product.category === 'Digital Products';

  return (
    <div className="product-details">
    <div className="product-details__header">
        <ArrowLeftOutlined
          className="product-details__back-icon"
          onClick={() => navigate(-1)}
        />
        <Title level={2} className="product-details__title">{product.productName}</Title>
      </div>

      <Row gutter={[32, 32]}>
        {/* Images */}
  <Col xs={24} md={12}>
  <Card className="product-details__image-card">
    {product.images?.length > 0 ? (
      <Image.PreviewGroup>
        <div className="product-details__main-image-wrapper">
          {/* Main Image */}
          <Image
            src={product.images[0]}
            alt="Main product image"
            className="product-details__main-image"
          />
          
          {/* Thumbnails */}
          <div className="product-details__thumbnail-list">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={product.images[index] || `https://picsum.photos/80/80?random=${product.key}${index}`}
                preview={{
                  src: product.images[index] || `https://picsum.photos/600/400?random=${product.key}${index}` // High-res for preview
                }}
                width={80}
                height={80}
                className="product-details__thumbnail"
              />
            ))}
          </div>
        </div>
      </Image.PreviewGroup>
    ) : (
      <div className="product-details__no-image">
        <Image.PreviewGroup>
          <div className="product-details__main-image-wrapper">
            <Image
              src={`https://picsum.photos/600/400?random=${product.key}`}
              className="product-details__main-image"
            />
            <div className="product-details__thumbnail-list">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={`https://picsum.photos/80/80?random=${product.key}${index}`} // Small thumbnail
                  preview={{
                    src: `https://picsum.photos/600/400?random=${product.key}${index}` // High-res preview
                  }}
                  width={80}
                  height={80}
                  className="product-details__thumbnail"
                />
              ))}
            </div>
          </div>
        </Image.PreviewGroup>
      </div>
    )}
  </Card>
</Col>

        {/* Info */}
        <Col xs={24} md={12}>
          <div className="product-details__section">
            <Title level={4}>Basic Information</Title>
            <Descriptions column={1}>
              <Descriptions.Item label="SKU">
                <Text strong>{product.sku}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag color="blue">{product.category}</Tag>
              </Descriptions.Item>
              {product.tags?.length > 0 && (
                <Descriptions.Item label="Tags">
                  {product.tags.map((tag, index) => (
                    <Tag key={index} color="geekblue">{tag}</Tag>
                  ))}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>

          <Divider />

          {isDigital ? (
            <div className="product-details__section">
              <Title level={4}>Package Details</Title>
              <Tabs defaultActiveKey="basic" className="product-details__tabs">
                {['Basic', 'Standard', 'Premium'].map((level) => {
                  const lcLevel = level.toLowerCase();
                  return (
                    <TabPane tab={level} key={lcLevel}>
                      <div className="product-details__package-content">
                        <p><Text strong>Regular Price:</Text> ${product[`${lcLevel}Price`]}</p>
                        <p><Text strong>Sale Price:</Text> ${product[`${lcLevel}Sale`]}</p>
                        <p>
      <Text strong>Description:</Text>{' '}
      {product[`${lcLevel}Desc`] ? product[`${lcLevel}Desc`] : <span className="product-details__na">No description provided</span>}
    </p>

                      </div>
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          ) : (
            <div className="product-details__section">
              <Title level={4}>Product Specifications</Title>
              <Descriptions column={2}>
                <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                <Descriptions.Item label="Regular Price">${product.regularPrice}</Descriptions.Item>
                <Descriptions.Item label="Discounted Price">${product.discountPrice}</Descriptions.Item>
                <Descriptions.Item label="Weight">{product.weight} kg</Descriptions.Item>
                <Descriptions.Item label="Stock">{product.stock} units</Descriptions.Item>
                {product.sizes?.length > 0 && (
                  <Descriptions.Item label="Available Sizes">
                    {product.sizes.map((size, index) => (
                      <Tag key={index}>{size}</Tag>
                    ))}
                  </Descriptions.Item>
                )}
                {product.storages?.length > 0 && (
                  <Descriptions.Item label="Storage Locations">
                    {product.storages.map((storage, index) => (
                      <Tag key={index} color="green">{storage}</Tag>
                    ))}
                  </Descriptions.Item>
                )}
                 <Descriptions.Item label="Description" span={2}>
    {product.description ? product.description : <span className="product-details__na">No description</span>}
  </Descriptions.Item>
              </Descriptions>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
