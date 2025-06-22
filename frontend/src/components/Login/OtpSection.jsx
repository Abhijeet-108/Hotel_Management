import React from 'react'

function OtpSection({ otp, setOtp, handleOtpSubmit }) {
    return (
     <div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter OTP"
        />
      </div>
      <button
        onClick={handleOtpSubmit}
        className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
      >
        Verify OTP
      </button>
    </div>   
    )
}

export default OtpSection
