import styled from '@emotion/styled'
import React, {useEffect} from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductTile from "../components/ProductTile";
import SCard from "../components/SCard";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Slider } from '@mui/material';

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
margin-bottom: 40px;
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

const OutofStock = styled.div`
    color: red;
    font-weight: bold;
`;


function ProductPage() {
    const { productId } = useParams();
    const products = useSelector((state) => state.products.currentProducts);
    let filterProduct = null;

    products.map(product => {
        if(parseInt(product.id) === parseInt(productId)) {
            filterProduct = product;
            return filterProduct
        }
    });

    return (
        <Container>
            <Navbar />
            { filterProduct ? 
            <Wrapper>
                <ImageSection><SCard productData={filterProduct}/></ImageSection>
                <InfoSection>
                    <Link to='/'>Go to the Shop</Link>
                    <SalesCount>123 sales</SalesCount>
                    <ProductName>{filterProduct.name}</ProductName>
                    <ProductDesc>{filterProduct.description}</ProductDesc>
                    <ProductPrice>{filterProduct.price}</ProductPrice><br></br>
                    {
                        filterProduct.quantity > 0 ? 
                        <Slider defaultValue={1}    valueLabelDisplay="on"
                        max={filterProduct.quantity} aria-label="Default" />
                        : <OutofStock>Out of Stock</OutofStock>
                    }
                    <AddToCart>Add to cart</AddToCart>
                </InfoSection>
            </Wrapper>
            : <div></div>
            }
            <Footer />
        </Container>
    )
}

export default ProductPage