import React, { useEffect, useState } from "react";
import { Stack, ListItem, Link, Box, Modal } from '@mui/material';
import styled from "styled-components";
import './ShopLanding.css';
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ShopTile from "../components/ShopTile";
import { getShop, isShopNameAvailable } from "../redux/shop";
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASE } from "../api/http";
import ProductCard from "../components/ProductCard";

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
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
  width: 80%;
  height: 100%;
  padding-top: 40px;
  padding-left: 40px;
  display: flex;
`;

const OwnerHeader = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  padding-right: 100px;
  display: flex;
  justify-content: right;
`;

const ShopHome = () => {
  const user = useSelector((state) => state.user.currentUser);
  const shopInfo = useSelector((state) => state.shop.currentShop);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (user) {
          getShop(dispatch, { id: user.id });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchShops();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div>
      <Navbar />
      {user ?
        <div>
          <ContainerHeader>
            <Stack direction="row" spacing={2}>
            {
              shopInfo.shop.avatarUrl ?
              <img src={BASE + "/" + shopInfo.shop.avatarUrl} height="200" width="200" alt="owner avatar"></img>
              : <img src="defaultShop.png" height="200" width="200" alt="owner avatar"></img>
            } 
              <Stack spacing={2}>
                <ListItem><h2>{shopInfo.shop.name}</h2></ListItem>
                <ListItem><p>0 Sales</p></ListItem>
                <Stack direction="row" spacing={2}>
                  <ListItem><Button>Edit Shop</Button></ListItem>
                  <ListItem><Button>Add Product</Button></ListItem>
                </Stack>
              </Stack>
            </Stack>
            <OwnerHeader>
                <Stack spacing={0}>
                  <ListItem><h4 style={{align: "center"}}>Shop Owner</h4></ListItem>
                  {
                    shopInfo.user.avatarUrl ?
                    <ListItem><img src={BASE + "/" + shopInfo.user.avatarUrl} height="100" width="100" alt="owner avatar"></img></ListItem>
                    : <ListItem><img src="defaultShop.png" height="100" width="100" alt="owner avatar"></img></ListItem>
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
                          Name: {shopInfo.user.name}
                        </p>

                        <p id="modal-modal-description" sx={{ mt: 2 }}>
                          Email: {shopInfo.user.email}
                        </p>

                        <p id="modal-modal-description" sx={{ mt: 2 }}>
                          Phone: {shopInfo.user.phone}
                        </p>
                     </Box>

                     </Modal>
                </Stack>
            </OwnerHeader>
          </ContainerHeader>

          <ContainerBody>
            {
              shopInfo.inventory.length > 0 ?
              shopInfo.inventory.map(item => {
                return <ProductCard productData={item} />   
              })
              : <h2>No Products</h2>
            }
          </ContainerBody>
        </div> 
        :
        <div> 
        {/* <Error404 /> */}
        </div>
      }
    </div>
  );
};

export default ShopHome;