import React from 'react';
import { auth } from '../firebase';
import {signInWithEmailAndPassword} from "firebase/auth";
export const AuthContext = React.createContext();
// the fucntion of this component is to watch all pages & see if there is need to authenticate i.e all routes will be protected & will be chekced if the user is logged in or not
function AuthWrapper({children}) {
    console.log("hello in auth wrapper");
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    const store = {
        login
    }
  return (
    <AuthContext.Provider value={store}>
        {children}
    </AuthContext.Provider>
    
  )
}

export default AuthWrapper