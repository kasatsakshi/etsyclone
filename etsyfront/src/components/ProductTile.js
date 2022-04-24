import { AlignVerticalCenterOutlined, FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as React from 'react';
import {
  Card, CardHeader, Stack, Checkbox, CardActions, CardMedia, CardContent, IconButton, Box, Modal, Button,
} from '@mui/material';
import defaultProduct from '../assets/defaultProduct.png';
import { createFavoriteProduct, deleteFavoriteProduct } from '../redux/product';
import { numberFormat } from '../util/currency';

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
  width: 271,
};

function ProductTile({ productData }) {
  let productImage;
  const favorites = useSelector((state) => state.products.favoriteProducts);
  if (productData.pictureUrl) {
    productImage = `${productData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckboxChange = async (e) => {
    user
      ? e.target.checked
        ? await createFavoriteProduct(dispatch, { inventoryId: productData._id })
        : await deleteFavoriteProduct(dispatch, { inventoryId: productData._id })
      : navigate('/login');

    window.location.reload();
  };

  const checkFavorite = (id) => {
    if (!favorites) {
      return false;
    }
    const data = favorites.find((ele) => ele._id === id);

    if (data) {
      return true;
    }
    return false;
  };

  const viewMore = (e) => {
    navigate(`/productPage/${productData._id}`);
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={productData.name}
        style={{ textAlign: 'center' }}
        action={(
          <Checkbox
            checked={checkFavorite(productData._id)}
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon />}
            onChange={handleCheckboxChange}
          />
        )}
      />
      <CardMedia
        component="img"
        height="250"
        image={productImage}
        onClick={viewMore}
        alt="Product picture"
      />
      <CardActions sx={{ width: 271 }}>
        <Stack direction="row">
          <CardContent>
            <p>{numberFormat(productData.price, user ? user.currency : 'USD')}</p>
          </CardContent>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ProductTile;
