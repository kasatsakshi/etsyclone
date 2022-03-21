import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PurchaseOrders from "../components/PurchaseOrders";

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

function Purchases() {
    const orders = useSelector((state) => state.cart.purchases);
    console.log(orders);
    return (
        <Container>
        <Navbar />
        { orders && orders.length > 0  ? 
            <Wrapper>
                <Heading>Your Purchase Orders</Heading>

                <Grid container spacing={2}>
                    {orders && orders.length > 0 ?
                        orders.map(order => {
                            return order.orderDetails.map(orderDetail => {
                                console.log(orderDetail);
                                return (
                                    <PurchaseOrders orderData={order.order} orderItemData={orderDetail}/> 
                                )
                            })
                        })
                    : <div></div> }
                </Grid>           
          </Wrapper>
        :<NoOrders> No Purchase Orders </NoOrders>
        }
        <Footer />
    </Container>
    )
}

export default Purchases