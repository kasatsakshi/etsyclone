import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Grid } from "@mui/material";

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

function Cart() {
    const cartOrders = useSelector((state) => state.cart.cartProducts);
    
    return (
        <Container>
            <Navbar />
            { cartOrders && cartOrders.length > 0  ? 
                <Wrapper>
                    <Heading>Your Cart</Heading>
                    <Grid container spacing={2}>
                        {cartOrders && cartOrders.length > 0 ?
                        cartOrders.map(cartItem => {
                            return (
                                <CartItem productData={cartItem}/> 
                            )
                        })
                        : <div></div> }
                    </Grid>
              </Wrapper>
            :<NoOrders> No Orders added </NoOrders>
            }
            <Footer />
        </Container>
    )
}

export default Cart