import { Avatar, CircularProgress } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';

function DisplayComments({postData}) {

    const [allComments,setAllComments] = useState(null);
    useEffect(() =>{
        let tempArr = [];
        postData.comments.map(async commentId =>{
            const docSnap = await getDoc(doc(db,"comments",commentId))
            tempArr.push(docSnap.data());
        });
        setAllComments([...tempArr]);
    },[postData]);
  return (
    <div>
        {
            allComments == null ?
            <CircularProgress color="success" /> :
            (
                <>
                {
                  allComments.map(commentObj => (
                    <div>
                        <Avatar src={commentObj.userDP}></Avatar>
                        <p><span>{commentObj.userName}</span>{commentObj.text}</p>
                    </div>
                    
                ))  
                }
                
            </>
            )
            
        }
    </div>
  )
}

export default DisplayComments