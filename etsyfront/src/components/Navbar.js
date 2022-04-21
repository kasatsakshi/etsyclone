import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import HistoryIcon from '@mui/icons-material/History';
import { logout } from '../redux/user';
import logo from '../assets/logo.png';
import { searchProductsByName } from '../redux/product';

function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState('');

  const handleKeyPress = async (e) => {
    try {
      if (e.key === 'Enter') {
        e.preventDefault();
        setSearchParam(e.target.value);
        await searchProductsByName(dispatch, { searchParam: e.target.value });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Stack>
        <nav className="navbar">
          {/* Logo */}
          <Link to="/">
            <img className="navbar__logo" src={logo} alt="Etsy" />
          </Link>

          {/* Search text box */}
          <div className="navbar__searchBox">
            <input
              type="text"
              className="navbar__searchInput"
              placeholder="Search for anything"
              onKeyUp={handleKeyPress}
            />
          </div>

          {/* User section */}
          <div className="navbar__userSection">
            {user
              ? (
                <>
                  <Link to="/purchases"><HistoryIcon className="navbar__icons" /></Link>
                  <Link to="/cart"><ShoppingCart className="navbar__icons" /></Link>
                  <Link to="/account" className="navbar__icons"><AccountCircle className="navbar__accountCircle" /></Link>
                  <Link to="/shop"><StoreIcon className="navbar__icons" /></Link>
                  <input type="button" className="navbar__button" value="Logout" onClick={() => logout(dispatch)} />
                </>
              )
              : (
                <>
                  <Link to="/login"><button className="navbar__button">Login</button></Link>
                  <Link to="/signup"><button className="navbar__button">Signup</button></Link>
                </>
              )}
          </div>

        </nav>
      </Stack>
      <Stack className="navbar__categories" direction="row" spacing={35}>
        <Link className="navbar__categoryLink" to="/">Clothing</Link>
        <Link className="navbar__categoryLink" to="/">Jewellery</Link>
        <Link className="navbar__categoryLink" to="/">Entertainment</Link>
        <Link className="navbar__categoryLink" to="/">Decor</Link>
        <Link className="navbar__categoryLink" to="/">Art</Link>
      </Stack>
      <hr className="navbar__line" />
    </div>
  );
}

export default Navbar;
