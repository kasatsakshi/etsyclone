import React, { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";
import styled from "styled-components";
import './ProfileUpdate.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Stack, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import UploadImage from "../components/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../components/Error404";

const Container = styled.div`
 position: relative;
 min-height: 100vh;
`;

const Wrapper = styled.div`
  background-color: white;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  margin-left: 400px;
  margin-right: 400px;
  padding-bottom: 120px;
`;

const Form = styled.form`
  display: block;
  flex-wrap: wrap;
  justify-content: left;
  background-color: white;
  border: 1px solid #dadbd6;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  `;

const ShopCreate = () => {
  const { name } = useParams();
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Form>
          <div className='update__form'>
            <Stack>
              <Stack>
                <div className='update__pictureTextSpan'>
                  <span className='update__chooseFile'>
                    <UploadImage type="user" />
                  </span>
                </div>
                <div className='update__picture'>
                  {
                    // user.avatarUrl ? <img className='image__avatar' src={BASE + "/" + user.avatarUrl} alt="userProfile"></img> :
                    <img src="defaultShop.png" height="200" width="200" alt="user avatar"></img>
                  }
                  <p className='update__labeltext'>Must be a .jpg, .gif or .png file smaller than 10MB and at least 400px by 400px.</p>
                </div>
              </Stack>
              <Stack>
                <div className='update__nameSection'>
                  <label className='update__labels'>Shop Name</label>
                  <p>{name}</p>
                </div>
              </Stack>
              <Stack>
                <div className='update__nameSection'>
                  <label className='update__labels'>Address</label>
                  <input className='update__input'></input>
                </div>
              </Stack>
              <Stack>
                <div className='update__nameSection'>
                  <label className='update__labels'>Country</label>
                  <select>
                    <option>- Select your country -</option>
                    <option value='1'>USA</option>
                    <option value='2'>IND</option>
                    <option value='3'>UK</option>
                  </select>
                </div>
              </Stack>
              <Stack>
                <div className='update__nameSection'>
                  <label className='update__labels'>Phone</label>
                  <input className='update__input'></input>
                </div>
              </Stack>
              <Stack>
                <div className='update__nameSection'>
                  <label className='update__labels'>Shop Description</label>
                  <input className='update__about'></input>
                </div>
              </Stack>
            </Stack>
          </div>
          <button className='update__button'>Create Shop</button>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ShopCreate;