import React, { useEffect} from "react";
import './Home.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductTile from "../components/ProductTile";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProducts, getUserFavorites } from "../redux/product";
import { Grid } from "@mui/material";

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

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.currentProducts);
  const favorites = useSelector((state) => state.products.favoriteProducts);

  const dispatch = useDispatch();
  let firstName;
  if (user && user.name) {
    firstName = user.name.split(" ")[0];
  } else {
    firstName = "Guest"
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
        await getUserFavorites(dispatch, user)
      }  catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
    fetchFavorites();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <div>
          {user ?
            <div className="home__announcement">
              <h1 className="home__announcementText">Welcome, {firstName}</h1>
            </div> :
            <div></div>
          }
        </div>
        <ContentWrapper>
          {
            <Grid container spacing={2}>
          {products && products.length > 0 ?
          products.map(product => {
            return (
              <ProductTile productData={product}/> 
            )
          }) :
          <div></div>
        }
        </Grid>
        }
        </ContentWrapper>
        {
          user ? 
          <ContentWrapper>
            <h1>User Favorites</h1>
          </ContentWrapper> : <div></div>
        }
        <ContentWrapper>
          {
          user ?   
          <Grid container spacing={2}>
          {favorites && favorites.length > 0 ?
          favorites.map(favorite => {
            return (
              <ProductTile productData={favorite}/> 
            )
          }) :
          <div></div>
        }
        </Grid>
        : <div></div>
        }
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Home;

