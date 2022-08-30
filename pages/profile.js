import React from 'react';
import Profile from '../components/Profile';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';
import {useContext} from 'react';

function profile() {
  const {user} = useContext(AuthContext);

  const Redirect = () =>{
    const router = useRouter();
    router.push("/login");
  }
  return (
    // this component will only be visible when we are logged in because it is wrapped by auth(see in _app.js)
    <>
    {user?.uid?
      <Profile/> : <Redirect/>}
    </>
  )
}

export default profile;