import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SCard from '../components/SCard';
import { addToCart } from '../redux/cart';
import { numberFormat } from '../util/currency';

const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
display: flex;
padding-bottom:80px;
margin-left: 170px;
margin-right:170px;
`;

const ImageSection = styled.div`
position:relative;
margin-top:20px;
margin-right: 10px;
width: 600px;
padding: 20px;
`;

const InfoSection = styled.div`
position:absolute;
right:200px;
margin-top:20px;
width: 450px;
padding: 20px;
`;

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
margin-bottom: 1px;
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
  const [quantityNeeded, setQuantityNeeded] = useState(1);
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.currentProducts);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  let filterProduct = null;
  const dispatch = useDispatch();
  const navigate = new useNavigate();

  const [cartLink, setCartLink] = React.useState(false);

  products.map((product) => {
    if (product._id === productId) {
      filterProduct = product;
      return filterProduct;
    }
  });

  const addtoCart = (e) => {
    if (!user) {
      navigate('/login');
    }
    setCartLink(true);
    let cartItems = [];
    if (cartProducts) {
      cartItems = [...cartProducts];
    }
    const order = { ...filterProduct };
    order.quantityNeeded = quantityNeeded;
    cartItems.push(order);
    addToCart(dispatch, cartItems);
  };

  const shopLink = `/shop/${filterProduct.shopId}`;

  return (
    <Container>
      <Navbar />
      {filterProduct
        ? (
          <Wrapper>
            <ImageSection><SCard productData={filterProduct} /></ImageSection>
            <InfoSection>
              <Link to={shopLink}>Go to the Shop</Link>
              <SalesCount>
                {filterProduct.totalSales}
                {' '}
                sales
              </SalesCount>
              <ProductName>{filterProduct.name}</ProductName>
              <ProductDesc>{filterProduct.description}</ProductDesc>
              <ProductPrice>{numberFormat(filterProduct.price, user ? user.currency : 'USD')}</ProductPrice>
              <br />
              {
                            filterProduct.quantity > 0
                            // <Slider defaultValue={1} onChange={(e) => setQuantityNeeded(e.target.value)}  valueLabelDisplay="on"
                            // max={filterProduct.quantity} aria-label="Default" />
                              ? (
                                <ButtonGroup
                                  sx={{
                                    height: 30, paddingLeft: 1, marginBottom: 15, paddingTop: 0,
                                  }}
                                  disableElevation
                                  variant="outlined"
                                  color="inherit"
                                >
                                  <Button disabled={quantityNeeded >= filterProduct.quantity} onClick={() => setQuantityNeeded(quantityNeeded + 1)}>+</Button>
                                  <Button>{quantityNeeded}</Button>
                                  <Button disabled={quantityNeeded <= 1} onClick={() => setQuantityNeeded(quantityNeeded - 1)}>-</Button>
                                </ButtonGroup>
                              )
                              : <OutofStock>Out of Stock</OutofStock>
                        }
              <AddToCart onClick={addtoCart}>Add to cart</AddToCart>
              {cartLink ? <AddToCart><Link to="/cart">Go to Cart</Link></AddToCart> : <div />}
            </InfoSection>
          </Wrapper>
        )
        : <div />}
      <Footer />
    </Container>
  );
}

export default ProductPage;
