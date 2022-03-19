import * as React from 'react';
import { Card, CardHeader, Stack, Typography, CardActions, CardMedia, CardContent, IconButton,  Box, Modal } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { BASE } from '../api/http';
import defaultProduct from "../assets/defaultProduct.png";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cardStyle = {
  margin: 4,
  width: 300
}

export default function ProductCard({productData}) {
  let productImage;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if(productData.pictureUrl ) {
    productImage = BASE + "/" + productData.pictureUrl
   } else {
    productImage = {defaultProduct}
   }
  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={productData.name}
        style={{textAlign: "center"}}
        action={
          <IconButton aria-label="settings">
            <Edit 
              onClick={handleOpen}
            />
          </IconButton>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <CardMedia
        component="img"
        height="250"
        image={productImage}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productData.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ width: 300}}>
        <Stack direction="row">
        <CardContent>
            <p>category: {productData.category}</p>
          </CardContent>
          <CardContent>
            <p>quantity: {productData.quantity}</p>
          </CardContent>
          <CardContent>
            <p>price: {productData.price}</p>
          </CardContent>
        </Stack>
      </CardActions>
    </Card>
  );
}
