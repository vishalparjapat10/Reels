import React from 'react';
import Navbar from './Navbar';
import Upload from './Upload';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Feed() {
  return (
    <div className='feed-cont'>
        <Navbar/>
        <Upload/>
        <div className='videos-cont'>
          <div className='post-cont'>
            <video/>
            <div className='video-info'>
              <div className='avatar-cont'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{margin:'0.5rem'}}/>
                <p>Vishal Parjapat</p>
              </div>
              <div className='post-like'>
                <FavoriteIcon/>
                <p>10</p>
              </div>
            </div>
          </div>
          <div className='post-cont'>
            <video/>
          </div>
          <div className='post-cont'>
            <video/>
          </div>
        </div>
    </div>
  )
}

export default Feed