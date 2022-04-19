import React, { useEffect, useState } from 'react';
import {
  Navigate,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import './ShopLanding.css';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Stack,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { getShop, isShopNameAvailable } from '../redux/shop';

const Button = styled.button`
  width: 50%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 15%;
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

function ShopLanding() {
  const user = useSelector((state) => state.user.currentUser);
  const shop = useSelector((state) => state.shop.currentShop);
  const navigate = new useNavigate();

  const dispatch = useDispatch();
  const [shopName, setShopName] = useState('');
  const [availability, setAvailablility] = useState('');

  const checkShop = async (e) => {
    e.preventDefault();
    const availableShop = await isShopNameAvailable({ shopName });
    if (availableShop.message) {
      setAvailablility('Available');
    } else {
      setAvailablility('Unavailable');
    }
  };

  const nextShop = (e) => {
    e.preventDefault();
    // <Navigate to="/shopnew" />
    navigate(`/shopnew/${shopName}`);
    // navigate(['shopnew'], { state: { example: 'bar' } });
  };

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
    fetchShops();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      {user
        ? (
          <div>
            <div className="shop__landing">
              <h1 className="shop__landing__text">Sell on Etsy</h1>
            </div>
            {
            shop && shop.shop && shop.shop._id
              ? <Navigate to="/shophome" />
              : (
                <div>
                  <h1 className="heading">Name your shop</h1>
                  <h4 className="heading-description">Choose a memorable name that reflects your style</h4>
                  <hr />

                  <Container>
                    <Stack spacing={2}>
                      <Stack spacing={2} direction="row">
                        <OutlinedInput
                          required
                          style={{ width: '80%' }}
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
                    availability === 'Available' ? (
                      <Button style={{ height: '30px' }} onClick={nextShop}>
                        Next
                      </Button>
                    )
                      : <p />
                  }
                    </Stack>
                  </Container>

                </div>
              )
          }
          </div>
        )
        : (
          <div>
            {/* <Error404 /> */}
          </div>
        )}
    </div>
  );
}

export default ShopLanding;
