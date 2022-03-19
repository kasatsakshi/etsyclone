import React, { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate
} from "react-router-dom";
import styled from "styled-components";
import './ShopLanding.css';
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ShopTile from "../components/ShopTile";
import { getShop, isShopNameAvailable } from "../redux/shop";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Stack, ListItem, Link, Box, Modal } from '@mui/material';

const Button = styled.button`
  width: 50%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 10%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Red = styled.span`
  color: red;
`;

const Green = styled.span`
  color: green;
`;

const ShopLanding = () => {
  const user = useSelector((state) => state.user.currentUser);
  const shop = useSelector((state) => state.shop.currentShop);
  const navigate = new useNavigate();

  const dispatch = useDispatch();
  const [shopName, setShopName] = useState("");
  const [availability, setAvailablility] = useState(""); 

  const checkShop = async (e) => {
    e.preventDefault();
    const availableShop = await isShopNameAvailable({ shopName });
    if(availableShop.message) {
      setAvailablility("Available");
    } else {
      setAvailablility("Unavailable");
    }
  };

  const nextShop = (e) => {
    e.preventDefault();
    // <Navigate to="/shopnew" />
    navigate(`/shopnew/${shopName}`);
    // navigate(['shopnew'], { state: { example: 'bar' } });
  }

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

  return (
    <div>
      <Navbar />
      {user ?
        <div>
          <div className="shop__landing">
            <h1 className="shop__landing__text">Sell on Etsy</h1>
          </div> 
          {
            shop && shop.shop && shop.shop.id > 0 ? 
              <Navigate to="/shophome" />
            : 
            <div>
              <h1 className="heading">Name your shop</h1>
              <h4 className="heading-description">Choose a memorable name that reflects your style</h4>
              <hr/>   

              <Container>
                <Stack spacing={2}>
                  <Stack direction="row">
                    <OutlinedInput
                      required
                      id="shop-name"
                      label="Shop Name"
                      placeholder="Enter Shop Name"
                      onChange={(e) => {
                        setShopName(e.target.value);
                      }}
                    /> 
                    <Button onClick={checkShop}>
                      Check availability
                    </Button>
                  </Stack>
                  <p id="availabilty">{availability}</p>
                  {
                    availability === "Available" ?
                      <Button onClick={nextShop}>
                      Next
                    </Button>
                    :<p></p>
                  }
                </Stack>
              </Container>      

            </div>
          }
        </div> 
        :
        <div> 
        {/* <Error404 /> */}
        </div>
      }
    </div>
  );
};

export default ShopLanding;