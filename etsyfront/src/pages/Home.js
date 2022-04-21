import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductTile from '../components/ProductTile';
import { getProducts, getUserFavorites } from '../redux/product';

const Container = styled.div`
 position: relative;
 min-height: 100vh;
`;

const Wrapper = styled.div`
 padding-bottom:80px;
`;

const ContentWrapper = styled.div`
 margin-left: 100px;
 margin-right: 100px;
 margin-top: 40px
`;

function Home() {
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.currentProducts);
  const favorites = useSelector((state) => state.products.favoriteProducts);
  const searchedProducts = useSelector((state) => state.products.searchedProducts);
  // let searched = [];
  // products && products.map(product => {
  //   if (product.name.includes('bruh')) {
  //     searched.push(product);
  //   }
  // });
  // console.log(searched);

  const dispatch = useDispatch();
  let firstName;
  if (user && user.name) {
    firstName = user.name.split(' ')[0];
  } else {
    firstName = 'Guest';
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts(dispatch);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchFavorites = async () => {
      try {
        await getUserFavorites(dispatch, user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
    if (localStorage.getItem('token')) {
      fetchFavorites();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <div>
          {user
            ? (
              <div className="home__announcement">
                <h1 className="home__announcementText">
                  Welcome,
                  {firstName}
                </h1>
              </div>
            )
            : <div />}
        </div>
        {searchedProducts && searchedProducts.length > 0
          ? (
            <ContentWrapper>
              <Grid container spacing={2}>
                {searchedProducts.map((product) => (
                  <ProductTile productData={product} />
                ))}
              </Grid>
            </ContentWrapper>
          )
          : (
            <ContentWrapper>
              <Grid container spacing={2}>
                {products && products.length > 0
                  ? products.map((product) => (
                    <ProductTile productData={product} />
                  ))
                  : <div />}
              </Grid>
            </ContentWrapper>
          )}
        {
          user
            ? favorites && favorites.length > 0
              ? (
                <ContentWrapper>
                  <h1>User Favorites</h1>
                </ContentWrapper>
              )
              : <div />
            : <div />
        }
        <ContentWrapper>
          {
            user
              ? (
                <Grid container spacing={2}>
                  {favorites && favorites.length > 0
                    ? favorites.map((favorite) => (
                      <ProductTile productData={favorite} />
                    ))
                    : <div />}
                </Grid>
              )
              : <div />
          }
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Home;
