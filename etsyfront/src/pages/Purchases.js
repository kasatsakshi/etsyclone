import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PurchaseOrders from "../components/PurchaseOrders";
import { useEffect } from "react";
import { getOrders } from '../redux/cart';

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
    padding-bottom: 20px;
    align-items: center
    text-align: center
    font-weight: bold;
    font-size: 20px;
`;

function Purchases() {
    const orders = useSelector((state) => state.cart.purchases);
    const user = useSelector((state) => state.user.currentUser);
    console.log(orders);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
          try {
            getOrders(dispatch, { id: user.id });
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
        <Navbar />
        { orders && orders.length > 0  ? 
            <Wrapper>
                <Heading>Your Purchase Orders</Heading>

                <Stack container spacing={2}>
                    {orders && orders.length > 0 ?
                        orders.map(order => {
                            return (
                                <div>
                                    <h4>Order Id: {order.order.orderId}</h4>
                                    <p>Final Amount: {order.order.finalAmount}</p>
                                    <p>Ordered Date: {order.order.orderedDate}</p>
                                    <Stack direction="row">
                                    { order.orderDetails.map(orderDetail => {
                                    return (
                                        <PurchaseOrders orderData={order.order} orderItemData={orderDetail}/> 
                                    ) 
                                })}
                                    </Stack>
                                </div>
                            )
                        })
                    : <div></div> }
                </Stack>           
          </Wrapper>
        :<NoOrders> No Purchase Orders </NoOrders>
        }
        <Footer />
    </Container>
    )
}

export default Purchases