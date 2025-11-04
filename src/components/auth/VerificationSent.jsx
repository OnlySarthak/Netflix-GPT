import React from 'react'
import { useNavigate } from "react-router-dom";

const VerificationSent = () => {
    const navigate = useNavigate();


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-black/70 px-14 py-12 rounded-md w-[360px] text-center">

                <h1 className="text-white text-3xl font-semibold mb-6">
                    Check your email
                </h1>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    A verification link has been sent to your email address.
                    <br />Please open the link to verify your account.
                </p>

                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium mb-4"
                    onClick={()=>navigate("/verified")}
                >
                    Resend Email
                </button>

                <p className="text-gray-400 text-sm mt-4">
                    Didn’t receive the email?
                    <button className="text-white ml-1 hover:underline">
                        Try again.
                    </button>
                </p>

            </div>
        </div>
    );

}

export default VerificationSent