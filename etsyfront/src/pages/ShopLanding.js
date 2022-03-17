import React, { useEffect } from "react";
import styled from "styled-components";
import './ShopLanding.css';
import Navbar from "../components/Navbar";
import Error404 from "../components/Error404";
import { useDispatch, useSelector } from "react-redux";
import ShopTile from "../components/ShopTile";
import { getShop } from "../redux/shop";
import { UserCard } from 'react-ui-cards';

const ShopList = styled.ul`
  display: flex;
`;

const ShopLanding = () => {
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
          <div className="shop__landing">
            <h1 className="shop__landing__text">Sell on Etsy</h1>
          </div> 
          <ShopList>
            { 
              <UserCard
                className="newShop"
                float
                positionName="Add new shop"
                href="/shop/new"
              />   
            }
            {
              shop.length > 0 ? 
                shop.map((element, index) => {
                  return <ShopTile data={element}/>
                })
              : <div></div>
            }
          </ShopList>
        </div> 
        :
        <div> 
        <Error404 />
        </div>
      }
    </div>
  );
};

export default ShopLanding;