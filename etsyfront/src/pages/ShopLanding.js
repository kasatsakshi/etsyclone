import React, { useEffect, useState } from "react";
import {
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import './ShopLanding.css';
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ShopTile from "../components/ShopTile";
import { getShop, isShopNameAvailable } from "../redux/shop";
import OutlinedInput from '@mui/material/OutlinedInput';

const Button = styled.button`
  width: 50%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 20px;
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

const List = styled.ul`
    display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.span`
  color: red;
`;

const ShopLanding = () => {
  const user = useSelector((state) => state.user.currentUser);
  const shop = useSelector((state) => state.shop.currentShop);
  // const isShopName = useSelector((state) => state.shop.availableShopName);

  const dispatch = useDispatch();
  const [shopName, setShopName] = useState("");

  const checkShop = (e) => {
    e.preventDefault();
    isShopNameAvailable(dispatch, { shopName });
  };

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
            shop && shop.length > 0 ? 
              // <Navigate to="/account" />
              <div />
            : 
            <div>
              <h1 className="heading">Name your shop</h1>
              <h4 className="heading-description">Choose a memorable name that reflects your style</h4>
              <hr/>   

              <Container>
                <Form>
                <List>
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
                </List>

                  {/* {error && <Error> {error} </Error>} */}
                  
                  if(isShopName.availableShopName) {
                    <Navigate to="/account" />
                  }
                </Form>
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