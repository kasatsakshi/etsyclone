import React, { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";
import styled from "styled-components";
import './ShopLanding.css';
import Navbar from "../components/Navbar";
import NotFound from "../components/Error404";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShopCreate = () => {
  const { name } = useParams();
  return (
    <div>
      <Navbar />
      {name ?
          <Container>
            <p>Form to create new shop should come here - shop name is {name}</p>
          </Container> 
        : <div>
        <NotFound />
        </div>
      }
    </div>
  );
};

export default ShopCreate;