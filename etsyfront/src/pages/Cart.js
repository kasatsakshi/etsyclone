import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Grid, Stack } from "@mui/material";
import {
    useNavigate
  } from "react-router-dom";
import { createOrder } from '../redux/cart';

const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
padding-bottom:80px;
margin-left: 100px;
margin-right:100px;
`;

const NoOrders = styled.div`
    position: relative;
    margin-top: 100px;
    text-align: center
`;

const Heading = styled.h1`
    position: relative;
    margin-top: 20px;
    align-items: center
    text-align: center
    font-weight: bold;
    font-size: 20px;
`;

const Button = styled.button`
  width: 10%;
  border: none;
  border-radius:50px;
  margin-top: 20px;
  margin-left: 20px;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:disabled {
    color: #2596be;
`;

function Cart() {
    const cartOrders = useSelector((state) => state.cart.cartProducts);
    let finalPrice = 0;

    const user = useSelector((state) => state.user.currentUser);
    const navigate = new useNavigate();
    const dispatch = useDispatch();


    const checkout = async (e) => {
        e.preventDefault(); 
        await createOrder(dispatch, {orderItems: cartOrders, userId: user.id});
        navigate(`/purchases`);
      };

    return (
        <Container>
            <Navbar />
            { cartOrders && cartOrders.length > 0  ? 
                <Wrapper>
                    <Heading>Your Cart</Heading>
                    <Grid container spacing={2}>
                        {cartOrders && cartOrders.length > 0 ?
                        cartOrders.map(cartItem => {
                            finalPrice = finalPrice + (cartItem.quantityNeeded * cartItem.price)
                            return (
                                <CartItem productData={cartItem}/> 
                            )
                        })
                        : <div></div> }
                    </Grid>
                    <Stack direction="row">
                        <Stack>
                            <h3>Items added: {cartOrders.length} </h3>
                            <h1>Total Price: {finalPrice} </h1>
                        </Stack>
                        <Button onClick={checkout}>Proceed to Checkout</Button>

                    </Stack>
                   
              </Wrapper>
            :<NoOrders> No Orders added </NoOrders>
            }
            <Footer />
        </Container>
    )
}

export default Cart