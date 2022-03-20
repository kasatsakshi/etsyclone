import { FavoriteBorder, ShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as React from 'react';
import { Card, CardHeader, Stack, Checkbox, CardActions, CardMedia, CardContent, IconButton, Box, Modal } from '@mui/material';
import defaultProduct from "../assets/defaultProduct.png";
import { BASE } from '../api/http';
import { createFavoriteProduct, deleteFavoriteProduct } from "../redux/product";

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
  width: 271
}

const ProductTile = ({ productData }) => {
  let productImage;
  const favorites = useSelector((state) => state.products.favoriteProducts);
  if (productData.pictureUrl) {
    productImage = BASE + "/" + productData.pictureUrl
  } else {
    productImage = defaultProduct
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = async (e) => {
    user ?
      e.target.checked ?
        await createFavoriteProduct(dispatch, {userId: user.id, inventoryId: productData.id })
        :
        await deleteFavoriteProduct(dispatch, {userId: user.id, inventoryId: productData.id })
    : navigate("/login");

    window.location.reload()
    
  }

  const checkFavorite = (id) => {
    const data = favorites.find(function(ele) {
      return ele.id === id;
    });
    
    if (data) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={productData.name}
        style={{ textAlign: "center" }}
        action={
          // <Checkbox onClick={checkUser} icon={<FavoriteBorder />} checkedIcon={<FavoriteIcon />} />
          <Checkbox
          checked={checkFavorite(productData.id)}
          icon={<FavoriteBorder />} 
          checkedIcon={<FavoriteIcon />} 
          onChange={handleCheckboxChange} />
        }
      />
      <CardMedia
        component="img"
        height="250"
        image={productImage}
        alt="Product picture"
      />
      <CardActions sx={{ width: 271 }}>
        <Stack direction="row">
          <CardContent>
            <p>price: {productData.price}</p>
          </CardContent>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductTile;