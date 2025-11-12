import { use, useRef, useState } from 'react'
import { validateLogin } from '../../utils/validateLogin';
import { validateSignUp } from '../../utils/validateSignup';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from '../../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUser } from "../../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const password2 = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useSelector((store) => store.user);
  const user = useSelector((store) => store.user);


  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);
  const onSubmit = (e) => {
    e.preventDefault();

    let tempError = null;
    email.current.value = email.current.value.toLowerCase();

    if (isSignInForm) {
      tempError = validateLogin(
        email.current.value,
        password.current.value
      );
    } else {
      tempError = validateSignUp(
        name.current.value,
        email.current.value,
        password.current.value,
        password2.current.value
      );
    }

    if (tempError) {
      setErrorMessage(tempError);
      return;
    }

    const username = name.current?.value;  // <-- SAFE, captured BEFORE rerender

    setErrorMessage(null);

    if (!isSignInForm) handleSignUp(username);
    else handleLogIn();
  };

  const handleSignUp = (username) => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email,
                displayName: username,
              })
            );
            console.log("User profile updated.");
            sendEmailVerification(user).then(() => {
              console.log("Verification email sent.");
            });
            navigate("/verify-sent");
          })
          .catch((err) => {
            console.log("Profile update error:", err);
          });
      })
      .catch((error) => {
        setErrorMessage(error.code + " - " + error.message);
      });
  };

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth,
      email.current.value,
      password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));

        if (user.emailVerified === false) {
          user.sendEmailVerification().then(() => {
            console.log("Verification email sent.");
          });
          navigate("/verify-sent");
          return;
        }

        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage("invalid credentials - " + errorMessage);
      });

  }

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
      }));
      
      navigate("/browse"); // Google is always verified
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className=" flex justify-center items-center min-h-screen">
        <div className="bg-black/70 px-14 py-12 rounded-md w-[360px]">

          <h1 className="text-white text-3xl font-semibold mb-8">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {errorMessage && (
            <p className="text-red-500 text-sm -mt-3 mb-4">
              {errorMessage}
            </p>
          )}


          {!isSignInForm &&
            (
              <input
                ref={name}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
              />
            )}

          {/* Email */}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
          />

          <div
            className='mt-4'></div>

          {/* Password */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Password 2 */}
          {!isSignInForm &&
            (<input
              ref={password2}
              type="password"
              placeholder="Enter password again "
              className="w-full px-4 py-3 mb-6 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
            />)
          }

          {/* Sign In Button */}
          <button
            onClick={onSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>


          <div className="text-center text-gray-400 mb-4">OR</div>

          {/* Use Code Button */}
          <button className="w-full bg-white/20 text-white py-3 rounded mb-4 hover:bg-white/30"
            onClick={handleGoogleLogin}>
            {isSignInForm ? "Sign in" : "Sign up"} using google
          </button>

          {isSignInForm &&
            (
              <>

                {/* Forgot Password */}
                <div className="text-center mb-4">
                  <a href="#" className="text-gray-300 hover:underline">Forgot password?</a>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 text-gray-300 text-sm mb-6">
                  <input type="checkbox" className="accent-red-600" />
                  <span>Remember me</span>
                </div>
              </>
            )
          }

          {/* Signup */}
          <p className="text-gray-400 text-sm">
            {isSignInForm &&
              ("New to Netflix?")}
            <button href="#" className="text-white ml-1 hover:underline"
              onClick={() => toggleSignInForm()}
            >
              {isSignInForm ? "Sign up now." : "Already a user"}
            </button>
          </p>

          {/* Captcha Note */}
          <p className="text-gray-500 text-[12px] mt-4 leading-tight">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <a className="text-blue-500 ml-1">Learn more.</a>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login;