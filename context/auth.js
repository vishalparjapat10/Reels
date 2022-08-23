import React,{useEffect,useState} from 'react';
import { auth } from '../firebase';
import {onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { setUserId } from 'firebase/analytics';
export const AuthContext = React.createContext();
// the fucntion of this component is to watch all pages & see if there is need to authenticate i.e all routes will be protected & will be chekced if the user is logged in or not
function AuthWrapper({children}) {
    console.log("hello in auth wrapper");

    const [user,setUser] = useState('');
    const [loading,setLoading] = useState(true);

    // https://firebase.google.com/docs/auth/web/start
    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
                setUser(user);
        })
        setLoading(false);
    },[])

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
        //goes to firebase check if function called is legit	
      //email pass checks with users table in authentication service 	
      // if present suceess ,else fail
    }

    function logout(){
        return signOut(auth)
    }

    function forgetPassword(){
        return sendPasswordResetEmail(auth,email);
    }
    const store = {
        login,
        user,
        logout,
        forgetPassword
    }
  return (
    <AuthContext.Provider value={store}>
        {!loading && children}
    </AuthContext.Provider>
    
  )
}

export default AuthWrapper