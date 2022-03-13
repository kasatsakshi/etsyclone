import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";

function Navbar() {
    const user = useSelector((state) => state.user.currentUser);
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
            {/* User link */}
            { user 
                ? <React.Fragment>
                    <ShoppingCartIcon /> 
                    <Link to='/logout'><button>Logout</button></Link>
                </React.Fragment>
                : <Link to='/login'><button>Login</button></Link>
            }

        </nav>
    )
}

export default Navbar