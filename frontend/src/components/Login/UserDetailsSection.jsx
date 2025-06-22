import React from 'react'

function UserDetailsSection({ userDetails, setUserDetails, handleUserDetailsSubmit }) {
    return (
        <div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <button
        onClick={handleUserDetailsSubmit}
        className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
      >
        Submit Details
      </button>
    </div>
    )
}

export default UserDetailsSection
