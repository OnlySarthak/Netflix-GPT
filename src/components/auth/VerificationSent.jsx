import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../utils/firebase";

const VerificationSent = () => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // TIMER LOGIC
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendEmail = () => {
    if (!canResend) return;

    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Verification email resent.");
        setTimer(30);
        setCanResend(false);
      })
      .catch((error) => {
        console.error("Error resending verification email:", error);
      });
  };

  const handleContinue = async () => {
    await auth.currentUser.reload(); // refresh user data

    if (auth.currentUser.emailVerified) {
      navigate("/verified"); // go to next component
    } else {
      alert("Email not verified yet! Please check your inbox.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black/70 px-14 py-12 rounded-md w-[360px] text-center">

        <h1 className="text-white text-3xl font-semibold mb-6">
          Verify your email
        </h1>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          We’ve sent a verification link to your email address.
          <br />
          Please click the link to activate your account.
        </p>

        {/* Resend Email Section */}
        <button
          disabled={!canResend}
          className={`w-full py-3 rounded font-medium mb-4 
            ${canResend ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-600 text-gray-300 cursor-not-allowed"}
          `}
          onClick={handleResendEmail}
        >
          {canResend ? "Resend Email" : `Resend in ${timer}s`}
        </button>

        {/* Continue Button */}
        <button
          className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded font-medium"
          onClick={handleContinue}
        >
          I Have Verified
        </button>

        <p className="text-gray-400 text-sm mt-4">
          Didn’t receive the email? Check spam/promotions folder.
        </p>

      </div>
    </div>
  );
};

export default VerificationSent;
