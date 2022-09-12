import React,{useContext,useEffect,useState} from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import logo from '../../assets/Instagram-img.png';
import Button from '@mui/material/Button';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Link from 'next/link';
import {useRouter} from "next/router";
import {AuthContext} from '../../context/auth';
import {storage,db} from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { setDoc,doc } from 'firebase/firestore';

function index() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fullName,setFullName] = useState('');
  const [file,setFile] = useState(null);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();// useRouter is a function of Next.js
  const {signup,user} = useContext(AuthContext);

  // useEffect(() =>{
  //   if(user){
  //     router.push('/');
  //   }
  // },[user]);

  let handleClick = async () =>{
    console.log(email);
    console.log(password);
    console.log(fullName);
    console.log(file);

    try{
      setLoading(true);
      setError("");
      const userInfo = await signup(email,password);
      console.log(userInfo.user.uid);
   
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `${userInfo.user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        let userData = {
          uid: userInfo.user.uid,
          fullName,
          email,
          password,
          downloadURL,
          posts:[]
        }

        console.log("file available at :",downloadURL);
        // db, collection name, document name
        await setDoc(doc(db, "users", userInfo.user.uid), userData);
        console.log("doc added to db");
      });
      }
    );

  console.log("user signed up");
}
    catch(err){
      console.log(err);
      setError(err.code);

      // user setTimeout to remove error after 2 sec
      setTimeout(() =>{
        setError("");
      },2000)
    }
    setLoading(false);
  };

  return (
    <div className='signup-container'>
        <div className='signup-card'>
            <Image src={logo}/>
            <TextField id="outlined-basic" label="Email" size="small" fullWidth margin="dense" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" size="small" fullWidth margin="dense" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <TextField id="outlined-basic" label="Full Name" size="small" fullWidth margin="dense" variant="outlined" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
            <Button color="secondary" variant="outlined" component="label" fullWidth size="small">
              {/* <IconButton color="secondary">
                <CloudUploadIcon/>
              </IconButton> */}
              Upload Profile Image
              <input hidden accept="image/*" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
              }}/>
            </Button>

            <Button style={{marginTop:"1rem"}} variant='contained' component="label" fullWidth onClick={handleClick}>
              Sign Up
            </Button>
            <div className="tnc">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
            </div>
        <div className='bottom-card'>
          Already Have an account ? 
          <Link href="/login"><span style={{color:"blueviolet",cursor:"pointer"}}>Login</span></Link>
        </div>
    </div>
  )
}

export default index