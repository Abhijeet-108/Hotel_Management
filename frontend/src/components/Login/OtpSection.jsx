import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function OtpSection({ otp, setOtp, handleOtpSubmit, PhoneNumber, handleBack }) {
  return (
    <div className='w-full rounded-lg shadow-sm'>
      <div className='flex justify-between items-center mb-4 w-full'>
        <FaArrowLeft
          onClick={handleBack}
          className='cursor-pointer text-gray-700 text-xl'
        />
        <h2 className='text-lg font-semibold text-center w-full '>Confirm Your Number</h2>
      </div>

      <hr className='my-2 border-gray-100'/>

      <label className='block text-gray-600 mb-4 mt-4'>
        Enter the code we've sent via SMS to {PhoneNumber}
      </label>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className='p-2 border rounded mb-4'
      />

      <hr className="my-2 border-gray-100" />

      <button
        onClick={handleOtpSubmit}
        className='w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600 mt-2 mb-2'
      >
        Verify OTP
      </button>
    </div>
  );
}

export default OtpSection