import React from "react";
import './Home.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductTile from "../components/ProductTile";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

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
`;

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  let firstName;
  if (user && user.name) {
    firstName = user.name.split(" ")[0];
  } else {
    firstName = "Guest"
  }
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
          <ProductTile />
        </ContentWrapper>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Home;