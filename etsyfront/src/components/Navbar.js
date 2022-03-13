import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import {ShoppingCart, AccountCircle} from '@mui/icons-material';
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

            {/* Sign in link */}
            {/* User link */}
            { user 
                ? <React.Fragment>
                    <ShoppingCart />
                    <AccountCircle />
                    <input type="button" className="btn" value="Logout" onClick={() => logout(dispatch)} />
                </React.Fragment>
                : <React.Fragment>
                        <Link to='/login'><button>Login</button></Link> 
                        <Link to='/signup'><button>Singup</button></Link>
                 </React.Fragment>
            }

        </nav>
    )
}

export default Navbar