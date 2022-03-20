import styled from "styled-components";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { accountInfo } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BASE } from "../api/http";
import defaultUser from "../assets/defaultUser.png";

import './Home.css';

const Container = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Icon = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: black;
    background-color: #FFEADB;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        // if (!user) {
        accountInfo(dispatch, { email: user.email });
        // }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Navbar />
      {/* User Info Section */}
      <div className='account__userInfo'>
        {
          user.avatarUrl ? <img className='image__avatar' src={BASE + "/" + user.avatarUrl} alt="userProfile"></img> :
            <img src={defaultUser} height="200" width="200" alt="user avatar"></img>
        }
        <span className="account__userName">{user.name}</span>
        <Link to='/profileUpdate'>
          <Icon><EditIcon style={{ fontSize: 18 }}></EditIcon></Icon>
        </Link>
      </div>
      {/* <div className='account__uploadPicture'>
        <UploadImage type="user" id={user.email} />
      </div> */}

      {/* Favorites Section */}
      <div className="account__searchLine">
        <div className="account__userFavorites">
          <h3 className="account__favoriteHeading">Favorite Items</h3>
          <PublicSharpIcon className="account__publicIcon" fontSize="small" />
          <text>Public</text>
          <Icon><EditIcon style={{ fontSize: 20 }}></EditIcon></Icon>
          <Icon><FileUploadOutlinedIcon style={{ fontSize: 28 }} /></Icon>
        </div>
        <div className="space"></div>
        <div className='account__searchBox' align="right">
          <input type='text' className='account__searchInput' placeholder='Search your favorites' />
        </div>
      </div>
      <Footer />
    </Container>

  );
};

export default Account;