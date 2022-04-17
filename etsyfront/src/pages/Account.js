import styled from 'styled-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { accountInfo } from '../redux/user';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE } from '../api/http';
import defaultUser from '../assets/defaultUser.png';
import ProductTile from '../components/ProductTile';

import './Home.css';

const Container = styled.div`
position: relative;
min-height: 100vh;
`;

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

const ContentWrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 40px
 `;

function Account() {
  const user = useSelector((state) => state.user.currentUser);
  const favorites = useSelector((state) => state.products.favoriteProducts);

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
      <div className="account__userInfo">
        {
          user.avatarUrl ? <img className="image__avatar" src={`${BASE}/${user.avatarUrl}`} alt="userProfile" />
            : <img src={defaultUser} height="200" width="200" alt="user avatar" />
        }
        <span className="account__userName">{user.name}</span>
        <Link to="/profileUpdate">
          <Icon><EditIcon style={{ fontSize: 18 }} /></Icon>
        </Link>
      </div>

      {/* Favorites Section */}
      <div className="account__searchLine">
        <div className="account__userFavorites">
          <h3 className="account__favoriteHeading">Favorite Items</h3>
          <PublicSharpIcon className="account__publicIcon" fontSize="small" />
          <text>Public</text>
          <Icon><EditIcon style={{ fontSize: 20 }} /></Icon>
          <Icon><FileUploadOutlinedIcon style={{ fontSize: 28 }} /></Icon>
        </div>
        <div className="space" />
        <div className="account__searchBox" align="right">
          <input type="text" className="account__searchInput" placeholder="Search your favorites" />
        </div>
      </div>

      <ContentWrapper>
        <Grid container spacing={2}>
          {favorites && favorites.length > 0
            ? favorites.map((favorite) => (
              <ProductTile productData={favorite} />
            ))
            : <div />}
        </Grid>
      </ContentWrapper>
      <Footer />
    </Container>

  );
}

export default Account;
