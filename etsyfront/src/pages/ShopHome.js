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

const ContainerHeader = styled.div`
  width: 100%;
  height: 10%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  padding-top: 40px;
  padding-left: 40px;
  display: flex;
  align-items: left;
  justify-content: left;
`;

const HorizontalList = styled.ul`
    display: flex;
`;

const VerticalList = styled.ul`
    display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.span`
  color: red;
`;

const ShopHome = () => {
  const user = useSelector((state) => state.user.currentUser);
  const shop = useSelector((state) => state.shop.currentShop);

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

  return (
    <div>
      <Navbar />
      {user ?
        <div>
          <ContainerHeader>
            <HorizontalList>
            <img src="defaultShop.png" height="200" width="200" alt="shop avatar"></img>

            </HorizontalList>
          </ContainerHeader>
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