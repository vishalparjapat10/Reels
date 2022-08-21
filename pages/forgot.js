import React,{useState,useContext,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../assets/Instagram-img.png';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';
import {AuthContext} from '../context/auth';
import { async } from '@firebase/util';
import {useRouter} from "next/router";
import Link from 'next/link';

function forgot() {

const [email,setEmail] = useState('');
const [error,setError] = useState('');
const [loading,setLoading] = useState(false);
const router = useRouter();// useRouter is a function of Next.js

const {forgetPassword,user} = useContext(AuthContext);

useEffect(() =>{
    if(user){
        // route to feed page
        router.push("/");
    }
},[user])
let handleClick = async() =>{
    try{
        
        console.log(email);
        setLoading(true);
        setError('');
        await forgetPassword(email);
        console.log("email sent");
        router.push("/login");
    }
    catch(err){
        setError(err.code);
        setTimeout(() => {
            setError('');
        },2000)
    }
    setLoading(false);
}
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
                <TextField id="outlined-basic" label="Email" size="small" fullWidth margin="dense" variant="outlined" value={email} onChange= {(e) => setEmail(e.target.value)}/>

                { error != "" && 
                    <div style={{color:"red"}}>{error}</div>
                }
                <Button style={{marginTop:"1rem"}} variant='contained' component="label" fullWidth onClick={handleClick} disabled={loading}>
                Send Mail
                </Button>
            </div>
            <div className='bottom-card'>
            Don't Have an account ? 
            <Link href="/signup"><span style={{color:"blueviolet",cursor:"pointer"}}>Sign up</span></Link>
            </div>
        </div>
        
    </div>
        
  )
}

export default forgot;