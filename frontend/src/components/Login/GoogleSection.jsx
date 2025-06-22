import React from 'react'

function GoogleSection({ handleAlternativeLogin }) {
    return (
        <div>
      <p className="text-sm text-gray-500 mb-4">
        You'll be redirected to Google to sign in.{' '}
        <a href="#" className="text-blue-500">Privacy Policy</a>.
      </p>
      <button
        onClick={() => handleAlternativeLogin('google')}
        className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
      >
        Sign in with Google
      </button>
    </div>
    )
}

export default GoogleSection
