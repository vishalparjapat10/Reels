import React,{useContext,useEffect,useState} from 'react';
import Navbar from './Navbar';
import Upload from './Upload';
import { AuthContext } from '../context/auth';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase';
import Post from './Post';
// import Post from './Post';


function Feed() {

  const {user} = useContext(AuthContext);
  const [userData,setUserData] = useState({});
  const [posts,setPosts] = useState([]);

  useEffect(() =>{
    console.log(user);
    // read the user info from db
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.log("Current data: ",doc.data());
      setUserData(doc.data());
    });
    return () => { unsub() };
  },[user]);

  // get posts from db
  useEffect(() =>{
    console.log(user);
    // read the user info from db
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy("timeStamp","desc")),
    (snapshot) => {
      let tempArray = [];
      snapshot.docs.map(doc => tempArray.push(doc.data()));
      
      setPosts([...tempArray]);
    });
    return () => { unsub() };
  },[]);

  console.log("Posts -> ",posts);
  return (
    <div className='feed-cont'>
        <Navbar userData={userData}/>
        <Upload userData={userData}/>
        <div className='videos-cont'>
          {
            posts.map((post) => (
              <Post postData={post} userData = {user}/>
            ))
          }
        </div>
    </div>
  )
}

export default Feed