import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from 'styled-components';
import './ProfileUpdate.css';
import { useDispatch, useSelector } from "react-redux";
import { BASE } from "../api/http";
import './Home.css';
import './ProfileUpdate.css';
import { Stack, Radio, RadioGroup, FormControlLabel } from '@mui/material';
//import DatePicker from '@mui/lab/DatePicker';

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

const ProfileUpdate = () => {
    const user = useSelector((state) => state.user.currentUser);
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
                    <div className='update__form'>
                        <Stack>
                            <Stack>
                                <div className='update__pictureTextSpan'>
                                    <span>Profile Picture</span>
                                    <span className='update__chooseFile'><button>Choose File</button></span>
                                </div>
                                <div className='update__picture'>
                                    {
                                        user.avatarUrl ? <img className='image__avatar' src={BASE + "/" + user.avatarUrl} alt="userProfile"></img> :
                                            <img src="defaultUser.png" height="200" width="200" alt="user avatar"></img>
                                    }
                                    <p className='update__labeltext'>Must be a .jpg, .gif or .png file smaller than 10MB and at least 400px by 400px.</p>
                                </div>
                            </Stack>
                            <Stack>
                                <div className='update__nameSection'>
                                    <label className='update__labels'>Your Name</label>
                                    <p className='update__labeltext'>{user.name}</p>
                                </div>
                            </Stack>
                            <Stack>
                                <div className='update__nameSection'>
                                    <label className='update__labels'>Gender</label>
                                    <RadioGroup row>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="ratherNotSay" control={<Radio />} label="Rather not say" />
                                        <FormControlLabel
                                            value="disabled"
                                            disabled
                                            control={<Radio />}
                                            label="other"
                                        />
                                    </RadioGroup>
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
                                    <label className='update__labels'>City</label>
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
                                    <label className='update__labels'>Birthday</label>
                                    <select label='month'>
                                        <option value>- month -</option>
                                        <option value='1'>January</option>
                                        <option value='2'>February</option>
                                        <option value='3'>March</option>
                                        <option value='4'>April</option>
                                        <option value='5'>May</option>
                                        <option value='6'>June</option>
                                        <option value='7'>July</option>
                                        <option value='8'>August</option>
                                        <option value='9'>September</option>
                                        <option value='10'>October</option>
                                        <option value='11'>November</option>
                                        <option value='12'>December</option>
                                    </select>
                                    <select>
                                        <option value>- day -</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                        <option value='13'>13</option>
                                        <option value='14'>14</option>
                                        <option value='15'>15</option>
                                        <option value='16'>16</option>
                                        <option value='17'>17</option>
                                        <option value='18'>18</option>
                                        <option value='19'>19</option>
                                        <option value='20'>20</option>
                                        <option value='21'>21</option>
                                        <option value='22'>22</option>
                                        <option value='23'>23</option>
                                        <option value='24'>24</option>
                                        <option value='25'>25</option>
                                        <option value='26'>26</option>
                                        <option value='27'>27</option>
                                        <option value='28'>28</option>
                                        <option value='29'>29</option>
                                        <option value='30'>30</option>
                                        <option value='31'>31</option>
                                    </select>
                                </div>
                            </Stack>
                            <Stack>
                                <div className='update__nameSection'>
                                    <label className='update__labels'>About</label>
                                    <input className='update__about'></input>
                                    <p className='update__labeltext'>Tell people a little about yourself.</p>
                                </div>
                            </Stack>
                        </Stack>
                        <button className='update__button'>Save Changes</button>
                    </div>
                </Form>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default ProfileUpdate