import { LockClosedIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 6) {
      setOtp(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    console.log('OTP submitted:', otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">OTP Verification</h2>
        <p className="mt-2 text-center text-gray-600">Please enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-center text-gray-900 placeholder-gray-400 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            className="relative flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition duration-150 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute left-0 flex items-center pl-3">
              <LockClosedIcon className="w-5 h-5 text-indigo-300 group-hover:text-indigo-100" aria-hidden="true" />
            </span>
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationScreen;
