import React, { useEffect, useState } from 'react';
import {
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import './ProfileUpdate.css';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { shopCreate } from '../redux/shop';
import defaultShop from '../assets/defaultShop.png';

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

function ShopCreate() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = new useNavigate();

  const { name } = useParams();
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarFile] = useState('');

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const onChange = (e) => {
    setAvatarFile({ file: e.target.files[0] });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const address = {
      address1,
      address2,
      city,
      state,
      country,
      zipcode,
    };
    await shopCreate(dispatch, {
      name, description, phone, avatarUrl, address,
    });
    navigate('/shophome');
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Form>
          <div className="update__form">
            <Stack>
              <Stack>
                <Stack direction="row">
                  <Stack>
                    <div className="update__picture">
                      {
                      // user.avatarUrl ? <img className='image__avatar' src={BASE + "/" + user.avatarUrl} alt="userProfile"></img> :
                        <img src={defaultShop} height="200" width="200" alt="user avatar" />
                    }
                      <p className="update__labeltext">Must be a .jpg, .gif or .png file smaller than 5MB and at least 400px by 400px.</p>
                    </div>
                  </Stack>
                  <input type="file" id="myImage" name="myImage" onChange={onChange} accept="image/png, image/jpeg" />
                </Stack>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Shop Name</label>
                  <p>{name}</p>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Address 1</label>
                  <input onChange={(e) => setAddress1(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Address 2</label>
                  <input onChange={(e) => setAddress2(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">City</label>
                  <input onChange={(e) => setCity(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">State</label>
                  <input onChange={(e) => setState(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Country</label>
                  <select onChange={(e) => setCountry(e.target.value)}>
                    <option>- Select your country -</option>
                    <option value="USA">USA</option>
                    <option value="IND">IND</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">ZipCode</label>
                  <input onChange={(e) => setZipcode(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Phone</label>
                  <input onChange={(e) => setPhone(e.target.value)} className="update__input" />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Shop Description</label>
                  <input onChange={(e) => setDescription(e.target.value)} className="update__about" />
                </div>
              </Stack>
            </Stack>
          </div>
          <button onClick={handleClick} disabled={isFetching} className="update__button">Create Shop</button>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default ShopCreate;
