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

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];

      console.log(ele);
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          console.log("123", entry.isIntersecting);
          ele.pause();
        }
      });
    });
  };
  let options = {
    // root: document.querySelector("#scrollArea"),
    // rootMargin: "0px",
    threshold: 0.6,
  };

  let observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    const elements = document.querySelectorAll(".videos-cont");
    console.log("wow", elements);
    let postContainer = elements[0].childNodes;
    console.log("timon",postContainer);
    postContainer.forEach((video) => {
      console.log("bye", video.childNodes[0]);
       observer.observe(video);
    });

    //cleanup 
    return () => {
      observer.disconnect();
    }
  }, [posts]);

  return (
    <div className='feed-cont'>
        <Navbar userData={userData}/>
        <Upload userData={userData}/>
        <div className='videos-cont'>
          {
            posts.map((post) => (
              <Post postData={post} userData = {userData}/>
            ))
          }
        </div>
    </div>
  )
}

export default Feed