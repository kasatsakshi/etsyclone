import styled from '@emotion/styled'
import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductTile from "../components/ProductTile";
import SCard from "../components/SCard";
import { Link } from 'react-router-dom';


const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
display: flex;
padding-bottom:50px;
margin-left: 170px;
margin-right:170px;
`;

const ImageSection = styled.div`
position:relative;
margin-top:20px;
margin-right: 10px;
width: 600px;
height: 700px;
padding: 20px;
`;

const InfoSection = styled.div`
position:absolute;
right:200px;
margin-top:20px;
width: 450px;
padding: 20px;
`;

const ShopName = styled.link``;

const SalesCount = styled.div`
padding: 1px;
font-size: 13px;
font-weight: 300;
`;

const ProductName = styled.div`
margin-top: 30px;
font-size: 25px;
margin-bottom: 5px;
`;

const ProductDesc = styled.div`
font-size:24px;
font-weight:300;
`;

const ProductPrice = styled.div`
margin-top: 15px;
font-size:25px;
font-weight:700;
`;

const QuantitySelect = styled.input`
width: 90%;
margin-top: 20px;
padding: 10px 15px;
`;

const AddToCart = styled.button`
  width: 100%;
  border: none;
  border-radius:50px;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: #2596be;
`;

function ProductPage() {
    return (
        <Container>
            <Navbar />
            <Wrapper>
                <ImageSection><SCard /></ImageSection>
                <InfoSection>
                    <Link to='/'>Sakshi's Portrait</Link>
                    <SalesCount>123 sales</SalesCount>
                    <ProductName>She's a Keeper</ProductName>
                    <ProductDesc>Here is a prtrait of cute, sensible, hardworlking girl. Look at this amazing page she designed.</ProductDesc>
                    <ProductPrice>1000.00</ProductPrice>
                    <QuantitySelect></QuantitySelect>
                    <AddToCart>Add to cart</AddToCart>
                </InfoSection>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default ProductPage