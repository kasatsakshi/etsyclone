import React, { useEffect, useState } from 'react';
import {
  Stack, ListItem, Link, Box, Modal, Grid, FormControlLabel, RadioGroup, Radio, Checkbox,
} from '@mui/material';
import styled from 'styled-components';
import './ShopLanding.css';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getShop, getShopCategories, shopProductCreate } from '../redux/shop';
import { BASE } from '../api/http';
import ProductCard from '../components/ProductCard';
import defaultShop from '../assets/defaultShop.png';
import defaultUser from '../assets/defaultUser.png';
import UploadImage from '../components/UploadImage';

const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
padding-bottom:80px;
margin-left: 100px;
margin-right:100px;
`;

const Button = styled.button`
  width: 90px;
  height: 30px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const ContainerHeader = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 40px;
  padding-left: 40px;
  display: flex;
`;

const ContainerBody = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-left: 20px;
  display: flex;
  position: 'absolute';
`;

const OwnerHeader = styled.div`
  width: 100%;
  height: 10%;
  padding-right: 100px;
  display: flex;
  justify-content: right;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

function ShopHome() {
  const user = useSelector((state) => state.user.currentUser);
  const shopInfo = useSelector((state) => state.shop.currentShop);
  const shopCategories = useSelector((state) => state.shop.currentCategories);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productOpen, setNewProductOpen] = React.useState(false);
  const handleOpenNewProduct = () => setNewProductOpen(true);
  const handleCloseNewProduct = () => setNewProductOpen(false);
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [isCustom, setIsCustom] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pictureUrl, setPicture] = useState('');

  let isDisabled;

  const pictureChange = (e) => {
    setPicture({ file: e.target.files[0] });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await shopProductCreate(dispatch, {
      name, description, pictureUrl, isCustom, category, price, quantity, shopid: shopInfo.shop._id,
    });
    handleCloseNewProduct();
    window.location.reload();
  };

  const [status, setStatus] = React.useState(0);

  const radioHandler = (status) => {
    setStatus(status);
  };

  const dispatch = useDispatch();

  const [shopOpen, setEditShop] = React.useState(false);
  const handleOpenEditShop = () => setEditShop(true);
  const handleCloseEditShop = () => setEditShop(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (user) {
          getShop(dispatch);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchShopCategories = async () => {
      try {
        if (user) {
          getShopCategories(dispatch, { id: shopInfo.shop._id });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchShops();
    fetchShopCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Navbar />
      {user
        ? (
          <Wrapper>
            <ContainerHeader>
              <Stack direction="row" spacing={2}>
                {
                shopInfo.shop.avatarUrl
                  ? <img src={`${BASE}/${shopInfo.shop.avatarUrl}`} height="200" width="200" alt="owner avatar" />
                  : <img src={defaultShop} height="200" width="200" alt="owner avatar" />
              }
                <Stack spacing={2}>
                  <ListItem><h2>{shopInfo.shop.name}</h2></ListItem>
                  <ListItem>
                    <p>
                      {shopInfo.totalSales}
                      {' '}
                      Sales
                    </p>
                  </ListItem>
                  <Stack direction="row" spacing={2}>
                    <Button onClick={handleOpenEditShop}>Edit Shop</Button>
                    <Modal
                      open={shopOpen}
                      onClose={handleCloseEditShop}
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Stack>
                          {
                            shopInfo.shop.avatarUrl
                              ? <img src={`${BASE}/${shopInfo.shop.avatarUrl}`} height="200" width="200" alt="owner avatar" />
                              : <img src={defaultShop} height="200" width="200" alt="owner avatar" />
                          }
                          <div style={{ paddingTop: 30 }}>
                            <UploadImage type="shop" id={shopInfo.shop.id} />
                          </div>
                        </Stack>
                      </Box>
                    </Modal>

                    <Button onClick={(handleOpenNewProduct)}>Add Product</Button>
                    <Modal
                      open={productOpen}
                      onClose={handleCloseNewProduct}
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Form>
                          <label style={{ alignContent: 'center', paddingBottom: 30 }}>Add New Product</label>
                          <input type="file" id="myImage" name="myImage" onChange={pictureChange} accept="image/png, image/jpeg" />
                          <br />
                          <Input
                            placeholder="name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Input
                            placeholder="description"
                            onChange={(e) => setDesc(e.target.value)}
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
                            defaultChecked
                            disabled={isDisabled}
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
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          <Input
                            placeholder="quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <br />
                          <Button onClick={handleClick}>
                            Add Item
                          </Button>
                        </Form>
                      </Box>
                    </Modal>
                  </Stack>
                </Stack>
              </Stack>
              <OwnerHeader>
                <Stack spacing={0}>
                  <ListItem><h4 style={{ align: 'center' }}>Shop Owner</h4></ListItem>
                  {
                  shopInfo.user.avatarUrl
                    ? <ListItem><img src={`${BASE}/${shopInfo.user.avatarUrl}`} height="100" width="100" alt="owner avatar" /></ListItem>
                    : <ListItem><img src={defaultUser} height="100" width="100" alt="owner avatar" /></ListItem>
                }
                  <ListItem><p>{shopInfo.user.name}</p></ListItem>
                  <ListItem><Link onClick={(handleOpen)}>Contact</Link></ListItem>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <p id="modal-modal-description" sx={{ mt: 2 }}>
                        Name:
                        {' '}
                        {shopInfo.user.name}
                      </p>

                      <p id="modal-modal-description" sx={{ mt: 2 }}>
                        Email:
                        {' '}
                        {shopInfo.user.email}
                      </p>

                      <p id="modal-modal-description" sx={{ mt: 2 }}>
                        Phone:
                        {' '}
                        {shopInfo.user.phone}
                      </p>
                    </Box>

                  </Modal>
                </Stack>
              </OwnerHeader>
            </ContainerHeader>

            <ContainerBody>
              <Grid container spacing={2}>
                {shopInfo.inventory.length > 0
                  ? shopInfo.inventory.map((data) => <ProductCard productData={data} />)
                  : <h2>No Products</h2>}
              </Grid>
            </ContainerBody>
          </Wrapper>
        )
        : (
          <div>
            {/* <Error404 /> */}
          </div>
        )}
      <Footer />
    </Container>
  );
}

export default ShopHome;
