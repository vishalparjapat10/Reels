import React,{useState} from 'react';
import { Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage,db } from '../firebase';

function Upload({userData}) {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [progress,setProgress] = useState(0);
  const fileLimit = 50;

  const handleChange = (e) =>{
    const file = e.target.files[0];
    console.log(file);
    if(file == null){
      setError("file not selected");
      setTimeout(() =>{
        setError("");
      },4000);
      return;
    }

    // if file size is greater than 50 mb
    if((file.size / (1024 * 1024)) > fileLimit){
      setError(`file too large, try uploading a file less than ${fileLimit} mb`);
      setTimeout(() =>{
        setError("");
      },4000);
      return;
    }

    let uid = uuidv4();
    setLoading(true);
   
      // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(prog);
      console.log('Upload is ' + prog + '% done');
    
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
      setError(error);
      setTimeout(() =>{setError('')},4000);
      return;
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        let postObj = {
          postId: uid,
          likes: [],
          postURL: downloadURL,
          profileName: userData.fullName,
          profilePhotoURL: userData.downloadURL,
          userId: userData.uid,
          timeStamp: serverTimestamp()
        }

        console.log("post", postObj);
        await setDoc(doc(db,"posts",uid),postObj);
        console.log("post added to posts collection");
        
        // update in users, posts ka arr
        await updateDoc(doc(db, "users", userData.uid), {
          posts: arrayUnion(uid)
        });

        console.log("posts array to user doc");
      });
      }
    );

    console.log("user signed up");

  }
  return (
    <div className='upload-btn'>
      {error != "" ?
        <Alert severity="error">{error}</Alert>
        :
        <Button color="secondary" variant="outlined" component="label" size="large" startIcon={<MovieIcon/>}>
        Upload Video
        <input hidden accept="video/*" type="file" onChange={handleChange}/>
        </Button>
    }
      
       
        {loading && 
          <LinearProgress variant="determinate" value={progress} style={{marginTop:"0.5rem"}} color='secondary'/>
        }
        
    </div>
  )
}

export default Upload