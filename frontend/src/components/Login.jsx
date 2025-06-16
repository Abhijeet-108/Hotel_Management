import React, {useState} from 'react'

function Login() {
    const [loginMethod, setLoginMethod] = useState('phone'); // Default to phone login
      const [previousMethod, setPreviousMethod] = useState(''); // Track the previous method for button naming
      const [step, setStep] = useState(1); // 1: Initial input, 2: OTP (for phone only), 3: User details
      const [phone, setPhone] = useState('');
      const [otp, setOtp] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [userDetails, setUserDetails] = useState({ name: '', email: '' });

      // Simulate MongoDB interaction (in a real app, this would be an API call to a backend)
      const saveUserToMongoDB = (data) => {
        console.log('Saving to MongoDB:', data);
        // Example: fetch('/api/saveUser', { method: 'POST', body: JSON.stringify(data) })
      };

      const handlePhoneSubmit = () => {
        console.log('Sending OTP to:', phone);
        setStep(2);
      };

      const handleOtpSubmit = () => {
        console.log('Verifying OTP:', otp);
        setStep(3);
      };

      const handleEmailSubmit = () => {
        console.log('Logging in with email:', email);
        setStep(3);
      };

      const handleAlternativeLogin = (method) => {
        console.log(`Logging in with ${method}`);
        setStep(3);
      };

      const handleUserDetailsSubmit = () => {
        saveUserToMongoDB({ phone, email, ...userDetails, loginMethod });
        console.log('User details saved:', userDetails);
      };

      const switchLoginMethod = (method) => {
        setPreviousMethod(loginMethod); // Store the current method as the previous one
        setLoginMethod(method);
        setStep(1); // Reset to initial step for the new method
        setPhone('');
        setOtp('');
        setEmail('');
        setPassword('');
      };

      // Map methods to display names for buttons
      const methodNames = {
        phone: 'phone',
        google: 'Google',
        email: 'email'
      };

      // Phone Login Section
      const PhoneSection = () => (
        <div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Country/Region</label>
            <select className="w-full p-2 border rounded">
              <option>India (+91)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Phone number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter phone number"
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
            <a href="#" className="text-blue-500">Privacy Policy</a>.
          </p>
          <button
            onClick={handlePhoneSubmit}
            className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
          >
            Continue
          </button>
        </div>
      );

      // Email Login Section
      const EmailSection = () => (
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
      );

      // Google Login Section
      const GoogleSection = () => (
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
      );

      // OTP Section (for phone login only)
      const OtpSection = () => (
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
      );

      // User Details Section
      const UserDetailsSection = () => (
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
      );

      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
              <button className="text-gray-500 text-xl">×</button>
            </div>
            <h2 className="text-lg font-semibold mb-4">Log in or sign up</h2>

            {loginMethod === 'phone' && step === 1 && <PhoneSection />}
            {loginMethod === 'phone' && step === 2 && <OtpSection />}
            {loginMethod === 'email' && step === 1 && <EmailSection />}
            {loginMethod === 'google' && step === 1 && <GoogleSection />}
            {loginMethod === 'apple' && step === 1 && <AppleSection />}
            {step === 3 && <UserDetailsSection />}

            {step < 3 && (
              <>
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                {loginMethod !== 'google' && (
                  <button
                    onClick={() => switchLoginMethod('google')}
                    className="flex items-center w-full p-3 border rounded mb-2 hover:bg-gray-100"
                  >
                    <span className="mr-2">G</span>
                    Continue with {previousMethod === 'google' ? methodNames[previousMethod] : 'Google'}
                  </button>
                )}
                {loginMethod !== 'apple' && (
                  <button
                    onClick={() => switchLoginMethod('apple')}
                    className="flex items-center w-full p-3 border rounded mb-2 hover:bg-gray-100"
                  >
                    <span className="mr-2">🍏</span>
                    Continue with {previousMethod === 'apple' ? methodNames[previousMethod] : 'Apple'}
                  </button>
                )}
                {loginMethod !== 'email' && (
                  <button
                    onClick={() => switchLoginMethod('email')}
                    className="flex items-center w-full p-3 border rounded mb-2 hover:bg-gray-100"
                  >
                    <span className="mr-2">✉️</span>
                    Continue with {previousMethod === 'email' ? methodNames[previousMethod] : 'email'}
                  </button>
                )}
                {loginMethod !== 'phone' && (
                  <button
                    onClick={() => switchLoginMethod('phone')}
                    className="flex items-center w-full p-3 border rounded hover:bg-gray-100"
                  >
                    <span className="mr-2">📞</span>
                    Continue with {previousMethod === 'phone' ? methodNames[previousMethod] : 'phone'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      );
}

export default Login
