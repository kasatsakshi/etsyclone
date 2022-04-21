import React from 'react';
import {
  Card, CardHeader, Checkbox, CardMedia,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteBorder } from '@mui/icons-material';
import defaultProduct from '../assets/defaultProduct.png';
import { BASE } from '../api/http';
import { createFavoriteProduct, deleteFavoriteProduct } from '../redux/product';

function SCard({ productData }) {
  let productImage;
  const favorites = useSelector((state) => state.products.favoriteProducts);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  if (productData.pictureUrl) {
    productImage = `${BASE}/${productData.pictureUrl}`;
  } else {
    productImage = defaultProduct;
  }
  const checkFavorite = () => {
    if (!favorites) {
      return false;
    }
    const data = favorites.find((ele) => ele.inventoryId === productData.id || ele.id === parseInt(productData.id));
    if (data) {
      return true;
    }
    return false;
  };

  const handleCheckboxChange = async (e) => {
    e.target.checked
      ? await createFavoriteProduct(dispatch, { inventoryId: productData._id })
      : await deleteFavoriteProduct(dispatch, { inventoryId: productData._id });

    // window.location.reload()
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="500px"
        image={productImage}
        alt="Picture"
        width="90%"
      />
      <CardHeader
        style={{ textAlign: 'center' }}
        action={(
          <Checkbox
            checked={checkFavorite()}
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon />}
            onChange={handleCheckboxChange}
          />
        )}
      />
      {/* <CardActions disableSpacing>
        <IconButton>
        { checkFavorite(productData.id) ?
          <FavoriteIcon />
          : <FavoriteBorder />
        }
        </IconButton>
      </CardActions> */}
    </Card>
  );
}

export default SCard;
