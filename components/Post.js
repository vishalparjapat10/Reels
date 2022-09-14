import React, { useEffect,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {db } from "../firebase";

function Post({postData,userData}) {
    console.log("Postdata -> ",postData);
    const [like,setLike] = useState(false);

    useEffect(() => {
      if (postData.likes.includes(userData.uid)) {
        setLike(true);
      }
      else {
        setLike(false);
      }
    }, [postData])
  
    const handleLike = async () => {
      if (like) { //unlike
        await updateDoc(doc(db, "posts", postData.postId), {
          likes: arrayRemove(userData.uid),
        });
      }
      else { //like
        // likes["12345677iuyhtgfrd"]
        await updateDoc(doc(db, "posts", postData.postId), {
          likes: arrayUnion(userData.uid)
        })
      }
    }
  return (
    <div className='post-cont'>
        <video src={postData.postURL}/>
        <div className='video-info'>
        <div className='avatar-cont'>
            <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} sx={{ margin: "0.5rem" }}/>
            <p style={{ color: "white" }}>{postData.profileName}</p>
        </div>
        <div className='post-like' style={like ? {color:"red"}: {color:"white"}}>
            <FavoriteIcon onClick={handleLike} />
            <p style={{ color: "white" }}>{postData.likes.length}</p>
        </div>
        </div>
    </div>
  )
}

export default Post