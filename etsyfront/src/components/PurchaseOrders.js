import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import {
  Card, CardHeader, Stack, CardActions, CardMedia, CardContent, IconButton, Box, Modal, Button,
} from '@mui/material';
import defaultProduct from '../assets/defaultProduct.png';
import { BASE } from '../api/http';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    // min-width: 280px;
    width:300px;
    height: 300px;
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;

const Image = styled.img`
    height: 75%;
    width: 100%;
    z-index: 2;
  `;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

const cardStyle = {
  margin: 4,
  width: 300,
};

function PurchaseOrders({ orderData, orderItemData }) {
  let productImage;
  const favorites = useSelector((state) => state.products.favoriteProducts);
  if (orderItemData.pictureUrl) {
    productImage = `${BASE}/${orderItemData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewMore = (e) => {
    navigate(`/productPage/${orderData.id}`);
  };

  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={orderItemData.name}
        style={{ textAlign: 'center' }}
      />
      <CardMedia
        component="img"
        height="250"
        image={productImage}
        onClick={viewMore}
        alt="Product picture"
      />
      <CardActions sx={{ width: 300 }}>
        <Stack direction="row">
          <CardContent>
            <p>
              price:
              {orderItemData.price}
            </p>
          </CardContent>
          <CardContent>
            <p>
              quantity:
              {orderItemData.orderQuantity}
            </p>
          </CardContent>
          <CardContent>
            <p>
              purchase on:
              {new Date(orderData.orderedDate).toLocaleDateString('en-US', options)}
            </p>
          </CardContent>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default PurchaseOrders;
