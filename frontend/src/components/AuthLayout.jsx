import React from 'react'

function AuthLayout() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
                <p className="text-center text-gray-600">Please sign in to your account</p>
                {/* Add your form or other content here */}
            </div>
        </div>
    )
}

export default AuthLayout
