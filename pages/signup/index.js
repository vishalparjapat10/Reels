import React from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/Instagram-img.png';

function index() {
  return (
    <div className='signup-container'>
        <div className='signup-card'>
            <Image src={logo}/>
            <TextField id="outlined-basic" label="Email" size="small" fullWidth margin="dense" variant="outlined" />
            <TextField id="outlined-basic" label="Password" size="small" fullWidth margin="dense" variant="outlined" type="password" />
            <TextField id="outlined-basic" label="Full Name" size="small" fullWidth margin="dense" variant="outlined" />
        </div>
    </div>
  )
}

export default index