import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

function SCard() {
  return (
    <Card >
      <CardMedia
        component="img"
        height="90%"
        image="profile.png"
        alt="Picture"
        width="90%"
      />
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default SCard