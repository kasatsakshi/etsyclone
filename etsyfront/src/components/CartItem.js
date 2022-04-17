import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import {
  Card, Checkbox, Stack, ButtonGroup, CardActions, CardMedia, CardContent, IconButton, Modal, Button,
} from '@mui/material';
import { useState } from 'react';
import defaultProduct from '../assets/defaultProduct.png';
import { BASE } from '../api/http';

const cardStyle = {
  margin: 4,
  display: 'flex',
  width: '75%',
  height: 200,
};

function CartItem({ productData }) {
  let productImage;
  const favorites = useSelector((state) => state.products.favoriteProducts);
  const [quantityNeeded, setQuantityNeeded] = useState(productData.quantityNeeded);
  if (productData.pictureUrl) {
    productImage = `${BASE}/${productData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewMore = (e) => {
    navigate(`/productPage/${productData.id}`);
  };

  return (

    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        height="100%"
        sx={{ width: '25%' }}
        image={productImage}
        onClick={viewMore}
        alt="Product picture"
      />
      <Stack direction="column" sx={{ display: 'flex', height: 200 }}>
        <CardContent sx={{ paddingLeft: '16px', paddingBottom: '1px' }}>
          <h3>{productData.name}</h3>
        </CardContent>
        <CardContent sx={{ paddingTop: '2px' }}>
          <p>
            price:
            {productData.price}
          </p>
          <p>
            quantity:
            {productData.quantityNeeded}
          </p>
        </CardContent>
        <Stack direction="row">
          <ButtonGroup
            sx={{ height: 25, paddingTop: '48px', paddingLeft: 2 }}
            disableElevation
            variant="outlined"
            color="inherit"
          >
            <Button disabled={quantityNeeded >= productData.quantity} onClick={() => setQuantityNeeded(quantityNeeded + 1)}>+</Button>
            <Button>{quantityNeeded}</Button>
            <Button disabled={quantityNeeded <= 1} onClick={() => setQuantityNeeded(quantityNeeded - 1)}>-</Button>
          </ButtonGroup>
          <IconButton sx={{ height: 25, paddingTop: '58px', marginLeft: 2 }} size="large" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" sx={{ paddingLeft: '8px', paddingTop: '4px' }}>
          <Checkbox sx={{ paddingTop: '0px' }} />
          <p sx={{ paddingLeft: '0px' }}>This order is a gift</p>
        </Stack>
      </Stack>
      {/* <CardActions sx={{ width: 271 }}>

      </CardActions> */}
    </Card>
  );
}

export default CartItem;
