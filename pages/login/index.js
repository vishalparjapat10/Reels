import React from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/Instagram-img.png';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import bg4 from '../../assets/bg4.jpg';

function index() {
  return (
    <div className='login-container'>
        <div className='insta-mob-bg'>
            <div className='carousel-cont'>
                <Carousel autoPlay interval={2000} infiniteLoop showArrows={false} showThumbs={false} showIndicators={false} stopOnHover showStatus={false}>
                    <Image src={bg1} />
                    <Image src={bg2} />
                    <Image src={bg3} />
                    <Image src={bg4} />
                </Carousel>
            </div>
        </div>
        <div>
            <div className='login-card'>
                <Image src={logo}/>
                <TextField id="outlined-basic" label="Email" size="small" fullWidth margin="dense" variant="outlined" />
                <TextField id="outlined-basic" label="Password" size="small" fullWidth margin="dense" variant="outlined" type="password" />

                <span style={{color:"blue",marginTop:"0.5rem"}}>Forget Password</span>
                <Button style={{marginTop:"1rem"}} variant='contained' component="label" fullWidth>
                Log in
                </Button>
            </div>
            <div className='bottom-card'>
            Don't Have an account ? <span style={{color:"blueviolet"}}>Sign up</span>
            </div>
        </div>
        
    </div>
        
  )
}

export default index