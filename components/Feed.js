import React from 'react';
import Navbar from './Navbar';
import Upload from './Upload';

function Feed() {
  return (
    <div className='feed-cont'>
        <Navbar/>
        <Upload/>
        <div className='videos-cont'>
          <div className='post-cont'>
            <video/>
          </div>
        </div>
    </div>
  )
}

export default Feed