import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user";

function Navbar() {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    return (
        <nav className='navbar'>
            {/* Logo */}
            <Link to="/">
                <img className='navbar__logo' src='logo.png' alt='Etsy' />
            </Link>

            {/* Search text box */}
            <div className='navbar__searchBox'>
                <input type='text' className='navbar__searchInput' placeholder='Search for anything' />
                {/* <SearchIcon className='navbar__searchIcon' /> */}
            </div>

            {/* User section*/}
            <div className='navbar__userSection'>
                {user
                    ? <React.Fragment>
                        <FavoriteBorderIcon className='navbar__icons' />
                        <ShoppingCart className='navbar__icons' />
                        <Link to='/account' className='navbar__icons'><AccountCircle className='navbar__accountCircle' /></Link>
                        <Link to='/shophome'><button className='navbar__button'>Sell on Etsy</button></Link>
                        <input type="button" className="navbar__button" value="Logout" onClick={() => logout(dispatch)} />
                    </React.Fragment>
                    : <React.Fragment>
                        <Link to='/login'><button className='navbar__button'>Login</button></Link>
                        <Link to='/signup'><button className='navbar__button'>Signup</button></Link>
                    </React.Fragment>
                }
            </div>

        </nav>
    )
}

export default Navbar