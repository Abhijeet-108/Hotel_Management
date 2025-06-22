import React from 'react'

function EmailSection({ email, setEmail, password, setPassword, handleEmailSubmit }) {
    return (
        <div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <p className="text-sm text-gray-500 mb-4">
        We'll email you to confirm your account.{' '}
        <a href="#" className="text-blue-500">Privacy Policy</a>.
      </p>
      <button
        onClick={handleEmailSubmit}
        className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
      >
        Continue
      </button>
    </div>
    )
}

export default EmailSection
