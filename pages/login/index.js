import React,{useState,useContext,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/Instagram-img.png';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpg';
import bg2 from '../../assets/bg2.jpg';
import bg3 from '../../assets/bg3.jpg';
import bg4 from '../../assets/bg4.jpg';
import {AuthContext} from '../../context/auth';
import { async } from '@firebase/util';
import {useRouter} from "next/router";

function index() {

const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState('');
const [loading,setLoading] = useState(false);
const router = useRouter();// useRouter is a function of Next.js

const {login,user} = useContext(AuthContext);

useEffect(() =>{
    if(user){
        // route to feed page
        router.push("/");
    }
},[user])
let handleClick = async() =>{
    try{
        
        console.log(email);
        console.log(password);
        setLoading(true);
        setError('');
        await login(email,password);
        console.log("logged in");
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
                <TextField id="outlined-basic" label="Password" size="small" fullWidth margin="dense" variant="outlined" type="password" value={password} onChange= {(e) => setPassword(e.target.value)}/>

                { error != "" && 
                    <div style={{color:"red"}}>{error}</div>
                }
                
                <div style={{color:"blue",marginTop:"0.5rem"}}>Forget Password</div>
                <Button style={{marginTop:"1rem"}} variant='contained' component="label" fullWidth onClick={handleClick} disabled={loading}>
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