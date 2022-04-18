import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack, Radio, RadioGroup, FormControlLabel, Link, Box, Modal,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProfileUpdate.css';
import { BASE } from '../api/http';
import './Home.css';

import defaultUser from '../assets/defaultUser.png';
import { updateUserInfo } from '../redux/user';

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

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Right = styled.div`
 margin-top: 32px;
 position: absolute;
 right: 400px;
`;

const Button = styled.button`
 background-color: white;
 border: 1px solid lightgrey;
 padding-top:5px;
 padding-bottom: 5px;
 padding-left: 12px;
 padding-right: 12px;
 &:hover {
    background-color: #FFEADB;
  }
`;

const Left = styled.div`
 position: absolute;
 left: 0px;
`;

const Title = styled.div`
 margin-top: 30px;
 margin-left: 400px;
 font-size: 30px;
 font-weight: 500;
`;

const Subtitle = styled.div`
 margin-left: 410px;
 font-weight: 500;
 color: grey;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProfileUpdate() {
  const reduxUser = useSelector((state) => state.user.currentUser);
  const parsedAddress = JSON.parse(reduxUser.address);
  const user = {
    ...reduxUser,
    address: parsedAddress,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);

  const [address1, setAddress1] = useState(user.address ? user.address.address1 : '');
  const [address2, setAddress2] = useState(user.address ? user.address.address2 : '');
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.address ? user.address.city : '');
  const [state, setState] = useState(user.address ? user.address.state : '');
  const [country, setCountry] = useState(user.address ? user.address.country : '');
  const [zipcode, setZipcode] = useState(user.address ? user.address.zipcode : '');
  const [bio, setBio] = useState(user.bio);
  const [birthday, setBirthday] = useState(user.birthday);
  const [avatarUrl, setAvatarFile] = useState(user.avatarUrl);

  const navigate = new useNavigate();

  const handleNameChange = async (e) => {
    e.preventDefault();
    setName(name);
    handleClose();
  };

  const profilePicUpdate = (e) => {
    setAvatarFile({ file: e.target.files[0] });
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    const address = {
      address1,
      address2,
      city,
      state,
      country,
      zipcode,
    };
    await updateUserInfo(dispatch, {
      name, email, gender, address, bio, birthday, avatarUrl, phone, userId: user.id,
    });
    navigate('/account');
  };

  return (
    <Container>
      <Navbar />
      <Left>
        <Title>Your Public Profile</Title>
        <Subtitle>Everything on this page can be seen by anyone</Subtitle>
      </Left>
      <Right><Button>View Profile</Button></Right>
      <Wrapper>
        <Form>
          <div className="update__form">
            <Stack>
              <Stack>
                <div className="update__pictureTextSpan">
                  <span>Profile Picture</span>
                  <span className="update__chooseFile"><input type="file" id="myImage" name="myImage" onChange={profilePicUpdate} accept="image/png, image/jpeg" /></span>
                </div>
                <div className="update__picture">
                  {
                                        user.avatarUrl ? <img className="image__avatar" src={`${BASE}/${user.avatarUrl}`} alt="userProfile" />
                                          : <img src={defaultUser} height="200" width="200" alt="user avatar" />
                                    }
                  <p className="update__labeltext">Must be a .jpg, .gif or .png file smaller than 5MB and at least 400px by 400px.</p>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Your Name</label>
                  <Stack direction="row" spacing={5}>
                    <p className="update__labeltext">{name || user.name}</p>
                    <Link onClick={(handleOpen)}>Change or remove</Link>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <p id="modal-modal-description" sx={{ mt: 2 }}>
                          Old Name:
                          {' '}
                          {user.name}
                        </p>
                        {' '}
                        <br />
                        <Input
                          placeholder="New Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleNameChange} className="update__button">Update Name</button>
                      </Box>
                    </Modal>
                  </Stack>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Gender</label>
                  <RadioGroup row defaultValue={user.gender}>
                    <FormControlLabel onClick={(e) => setGender('female')} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel onClick={(e) => setGender('male')} value="male" control={<Radio />} label="Male" />
                    <FormControlLabel onClick={(e) => setGender('ratherNotSay')} value="ratherNotSay" control={<Radio />} label="Rather not say" />
                    <FormControlLabel
                      control={<Radio />}
                      label="other"
                      onClick={(e) => setGender('other')}
                    />
                  </RadioGroup>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Address 1</label>
                  <input className="update__input" onChange={(e) => setAddress1(e.target.value)} defaultValue={user.address ? user.address.address1 : ''} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Address 2</label>
                  <input className="update__input" onChange={(e) => setAddress2(e.target.value)} defaultValue={user.address ? user.address.address2 : ''} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">City</label>
                  <input className="update__input" onChange={(e) => setCity(e.target.value)} defaultValue={user.address ? user.address.city : ''} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">State</label>
                  <input className="update__input" onChange={(e) => setState(e.target.value)} defaultValue={user.address ? user.address.state : ''} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Country</label>
                  <select onChange={(e) => setCountry(e.target.value)} defaultValue={user.address ? user.address.address1 : ''}>
                    <option>- Select your country -</option>
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Zip Code</label>
                  <input className="update__input" onChange={(e) => setZipcode(e.target.value)} defaultValue={user.address ? user.address.zipcode : ''} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Phone</label>
                  <input className="update__input" onChange={(e) => setPhone(e.target.value)} defaultValue={user.phone} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Email</label>
                  <input type="email" className="update__input" onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} />
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">Birthday</label>
                  <input className="update__input" onChange={(e) => setBirthday(e.target.value)} defaultValue={user.birthday} />
                  <p className="update__labeltext" style={{ paddingLeft: 20 }}>Enter in mm/dd/yyyy format</p>
                </div>
              </Stack>
              <Stack>
                <div className="update__nameSection">
                  <label className="update__labels">About</label>
                  <input className="update__about" onChange={(e) => setBio(e.target.value)} defaultValue={user.bio} />
                  <p className="update__labeltext" style={{ paddingLeft: 20, paddingTop: 20 }}>Tell people a little about yourself.</p>
                </div>
              </Stack>
            </Stack>
            <button onClick={saveChanges} className="update__button">Save Changes</button>
          </div>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default ProfileUpdate;
