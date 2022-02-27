import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
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

            {/* Sign in link */}
            <Link to='/signin'>
                <button>Sign in</button>
            </Link>
            {/* Checkout link */}
            <ShoppingCartIcon />
        </nav>
    )
}

export default Navbar