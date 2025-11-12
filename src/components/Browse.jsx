import React from 'react'
import HeaderBrowser from './HeaderBrowser'
import { useEffect } from 'react'
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL
        }));
        if (user.emailVerified === false) {
          sendEmailVerification(user).then(() => {
            console.log("Verification email sent.");
          });
          navigate("/verify-sent");
        } 
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

return (
  <div>
    <HeaderBrowser />
    <div className='text-white mt-20 p-8'>
      <h1 className='text-3xl font-bold mb-4'>Browse Page</h1>
      <p>Welcome to the Browse page! Here you can explore various movies and TV shows.</p>
    </div>

  </div>
)
}

export default Browse