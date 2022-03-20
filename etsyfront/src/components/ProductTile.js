import { FavoriteBorder, ShoppingCartOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as React from 'react';
import { Card, CardHeader, Stack, Checkbox, CardActions, CardMedia, CardContent, IconButton, Box, Modal } from '@mui/material';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={cardStyle}>
      <CardHeader
        action={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon />}
          />
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
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ProductTile;