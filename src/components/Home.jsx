import './css/home.css';
import Header from './Header';
import { Outlet } from "react-router-dom";
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
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
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
        console.log("yeah i am from home");
        
        //redirect to /browse
        navigate("/browse");
      } else {
        dispatch(clearUser());
        //redirect to /
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
