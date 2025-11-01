import React, { useState } from 'react'
import Header from './Header';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-black/70 px-14 py-12 rounded-md w-[360px]">

          <h1 className="text-white text-3xl font-semibold mb-8">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm &&
          (
            <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
            />
          )}

          {/* Email */}
          <input
            type="text"
            placeholder="Email or mobile number"
            className="w-full px-4 py-3 mb-9 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Password 2 */}
          {!isSignInForm &&
            (<input
              type="password"
              placeholder="Enter password again "
              className="w-full px-4 py-3 mb-6 rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none"
            />)
          }

          {/* Sign In Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {isSignInForm &&
            (
              <>
                <div className="text-center text-gray-400 mb-4">OR</div>

                {/* Use Code Button */}
                <button className="w-full bg-white/20 text-white py-3 rounded mb-4 hover:bg-white/30">
                  Use a sign-in code
                </button>

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
            <p className="text-blue-500 ml-1">Learn more.</p>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login;