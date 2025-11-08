import React from 'react'
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/browse");
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-black/70 px-14 py-12 rounded-md w-[360px] text-center">

                <h1 className="text-green-400 text-3xl font-semibold mb-6">
                    Email Verified!
                </h1>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    Your email has been successfully verified.
                    <br />You can now continue to your account.
                </p>

                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium"
                    onClick={handleContinue}
                >
                    Continue
                </button>

            </div>
        </div>
    );

}

export default EmailVerified