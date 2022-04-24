import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import {
  Card, Checkbox, Stack, ButtonGroup, Box,
  CardActions, CardMedia, CardContent, IconButton, Modal, Button,
} from '@mui/material';
import { useState } from 'react';
import defaultProduct from '../assets/defaultProduct.png';
import { BASE } from '../api/http';

const cardStyle = {
  margin: 4,
  display: 'flex',
  width: '75%',
  height: 250,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MessageButton = styled.button`
  width: 50%;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 3px;
  height: 35px;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 50%;
  margin: 10px 0;
`;

function CartItem({ productData }) {
  let productImage;
  const [messageBoxOpen, setMessageBoxOpen] = React.useState(false);
  const handleOpenAddMessage = () => { setMessageBoxOpen(true); };
  const handleCloseAddMessage = () => setMessageBoxOpen(false);

  const favorites = useSelector((state) => state.products.favoriteProducts);
  const cartOrders = JSON.parse(localStorage.getItem('cartOrders'));
  const [quantityNeeded, setQuantityNeeded] = useState(productData.quantityNeeded);
  const dispatch = useDispatch();
  const [giftMessage, setGiftMessage] = useState('');
  const [isGift, setIsGift] = useState(false);

  function updateOrder(payload) {
    const { productId, quantityUpdated } = payload;
    setQuantityNeeded(quantityUpdated);

    const cartProducts = [];
    cartOrders.map((cartOrder) => {
      if (cartOrder._id === productId) {
        cartOrder.quantityNeeded = quantityUpdated;
      }
      cartProducts.push(cartOrder);
    });

    localStorage.setItem('cartOrders', JSON.stringify(cartProducts));
    window.location.reload();
  }

  function deleteItem(item) {
    const cartOrders = JSON.parse(localStorage.getItem('cartOrders'));
    const { productId } = item;
    const cartProducts = [];
    cartOrders.map((cartOrder) => {
      if (cartOrder._id !== productId) {
        cartProducts.push(cartOrder);
      }
    });

    localStorage.setItem('cartOrders', JSON.stringify(cartProducts));
    window.location.reload();
  }

  if (productData.pictureUrl) {
    productImage = `${BASE}/${productData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const viewMore = (e) => {
    navigate(`/productPage/${productData._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const cartProducts = [];
    cartOrders.map((cartOrder) => {
      if (cartOrder._id === productData._id) {
        cartOrder.isGift = isGift;
        cartOrder.giftMessage = giftMessage;
      }
      cartProducts.push(cartOrder);
    });

    localStorage.setItem('cartOrders', JSON.stringify(cartProducts));
    handleCloseAddMessage();
    window.location.reload();
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
      <Stack direction="column" sx={{ display: 'flex', height: 300 }}>
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
            <Button disabled={quantityNeeded >= productData.quantity} onClick={() => updateOrder({ productId: productData._id, quantityUpdated: (quantityNeeded + 1) })}>+</Button>
            <Button>{quantityNeeded}</Button>
            <Button disabled={quantityNeeded <= 0} onClick={() => updateOrder({ productId: productData._id, quantityUpdated: (quantityNeeded - 1) })}>-</Button>
          </ButtonGroup>
          <IconButton sx={{ height: 25, paddingTop: '58px', marginLeft: 2 }} size="large" aria-label="delete">
            <DeleteIcon onClick={() => deleteItem({ productId: productData._id })} />
          </IconButton>
        </Stack>
        <Stack direction="row" sx={{ paddingLeft: '8px', paddingTop: '4px' }}>
          <Checkbox sx={{ paddingTop: '0px' }} onClick={handleOpenAddMessage} checked={productData.isGift} />
          <Modal
            open={messageBoxOpen}
            onClose={handleCloseAddMessage}
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Input autoFocus placeholder="Enter a message" onChange={(e) => { setGiftMessage(e.target.value); setIsGift(true); }} />
              <MessageButton onClick={handleClick}>Add message</MessageButton>
            </Box>
          </Modal>
          <p sx={{ paddingLeft: '0px' }}>This order is a gift</p>
        </Stack>
        <p style={{ marginLeft: '10px', te: 'red' }}>{productData.giftMessage}</p>
      </Stack>
    </Card>
  );
}

export default CartItem;
