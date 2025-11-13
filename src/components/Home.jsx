import './css/home.css';
import Header from './Header';
import { Outlet } from "react-router-dom";
import { useEffect } from 'react'
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified === true) {
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
          }));
          console.log(user);
          
          navigate("/browse");
        }
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <div className="home min-h-screen bg-cover bg-center">

      <Header />

      <div className="flex justify-center items-start">
        <Outlet />  {/* Dynamic blocks show here */}
      </div>

    </div>
  );
};

export default Home;
