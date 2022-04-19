import React, { useState } from 'react';
import {
  Card, CardHeader, Stack, Typography,
  CardActions, CardMedia, CardContent,
  FormControlLabel, RadioGroup, Radio,
  IconButton, Box, Modal,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BASE } from '../api/http';
import defaultProduct from '../assets/defaultProduct.png';
import { shopProductUpdate } from '../redux/shop';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 271,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Button = styled.button`
  width: 100%;
  height: 100%;
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

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const cardStyle = {
  margin: 4,
  width: 271,
};

export default function ProductCard({ productData }) {
  let productImage;
  let isDisabled;

  const shopCategories = useSelector((state) => state.shop.currentCategories);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [name, setName] = useState(productData.name);
  const [description, setDesc] = useState(productData.description);
  const [isCustom, setIsCustom] = useState('');
  const [category, setCategory] = useState(productData.category);
  const [price, setPrice] = useState(productData.price);
  const [quantity, setQuantity] = useState(productData.quantity);
  const [pictureUrl, setPicture] = useState(productData.pictureUrl);

  const handleClick = async (e) => {
    e.preventDefault();
    await shopProductUpdate(dispatch, {
      name, description, pictureUrl, isCustom, category, price, quantity, productId: productData._id,
    });
    handleClose();
    window.location.reload();
  };

  const pictureChange = (e) => {
    setPicture({ file: e.target.files[0] });
  };

  const [status, setStatus] = React.useState(0);
  const radioHandler = (status) => {
    setStatus(status);
  };

  if (productData.pictureUrl) {
    productImage = `${BASE}/${productData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={productData.name}
        style={{ textAlign: 'center' }}
        action={(
          <IconButton aria-label="settings">
            <Edit
              onClick={handleOpen}
            />
          </IconButton>
        )}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            {
            productData.pictureUrl
              ? <img src={`${BASE}/${productData.pictureUrl}`} height="200" width="200" alt="product avatar" />
              : <img src={defaultProduct} height="200" width="200" alt="owner avatar" />
          }
            <input style={{ paddingTop: 20 }} type="file" id="myImage" name="myImage" onChange={pictureChange} accept="image/png, image/jpeg" />
            <Input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={productData.name}
            />
            <Input
              type="text"
              placeholder="description"
              onChange={(e) => setDesc(e.target.value)}
              defaultValue={productData.description}
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="default"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel onClick={(e) => radioHandler(1)} value="default" control={<Radio />} label="Default" />
              <FormControlLabel checked={status === 2} onClick={(e) => radioHandler(2)} value="custom" control={<Radio />} label="Create New" />
            </RadioGroup>
            {status === 2 ? isDisabled = true : isDisabled = false}
            <Select
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
              disabled={isDisabled}
              value={productData.category}
            >
              <option color="grey" value="">category</option>
              {

                shopCategories && shopCategories.default.length > 0 && shopCategories.default.map((item) => <option value={item}>{item}</option>)
              }
              {
                shopCategories && shopCategories.custom.length > 0 && shopCategories.custom.map((item) => <option value={item.name}>{item.name}</option>)
              }
            </Select>
            {status === 2
              ? <Stack><Input placeholder="category name" onChange={(e) => { setCategory(e.target.value); setIsCustom(true); }} /></Stack> : <div />}
            <Input
              placeholder="price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              defaultValue={productData.price}
            />
            <Input
              placeholder="quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              defaultValue={productData.quantity}
            />
            <Button onClick={handleClick}>
              Update Product
            </Button>
          </Stack>
        </Box>
      </Modal>
      <CardMedia
        component="img"
        height="250"
        image={productImage}
        alt="Product picture"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productData.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ width: 271 }}>
        <Stack direction="row">
          <CardContent>
            <p>
              price:
              {productData.price}
            </p>
          </CardContent>
          <CardContent>
            <p>
              quantity:
              {productData.quantity}
            </p>
          </CardContent>
        </Stack>
      </CardActions>
    </Card>
  );
}
