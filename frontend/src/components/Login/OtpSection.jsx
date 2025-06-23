import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function OtpSection({ otp, setOtp, handleOtpSubmit, PhoneNumber, handleBack }) {
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <FaArrowLeft
          onClick={handleBack}
          className='cursor-pointer text-gray-700 text-xl'
        />
        <h2 className='text-lg font-semibold text-center w-full pr-6'>Confirm Your Number</h2>
      </div>

      <label className='block text-gray-600 mb-4 mt-4'>
        Enter the code we've sent via SMS to {PhoneNumber}
      </label>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className='w-full p-2 border rounded mb-4'
      />

      <button
        onClick={handleOtpSubmit}
        className='w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600'
      >
        Verify OTP
      </button>
    </div>
  );
}

export default OtpSection