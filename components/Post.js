import React from 'react';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Post({postData}) {
    console.log("Postdata -> ",postData);
    
  return (
    <div className='post-cont'>
        <video src={postData.postURL}/>
        <div className='video-info'>
        <div className='avatar-cont'>
            <Avatar alt="Remy Sharp" src={postData.profilePhotoURL}/>
            <p>{postData.profileName}</p>
        </div>
        <div className='post-like'>
            <FavoriteIcon/>
            <p>{postData.likes.length}</p>
        </div>
        </div>
    </div>
  )
}

export default Post