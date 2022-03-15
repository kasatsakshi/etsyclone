import React, { useState } from 'react'
import './ProductTile.css'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ProductTile() {
    return (
        <div className='tile'>
            <Link className='tile__link' to="/">
                <img className='tile__image' src='logo.png' />
            </Link>
            <div className='icon'>
                <FavoriteBorderIcon />
            </div>
        </div>
    )
}

export default ProductTile