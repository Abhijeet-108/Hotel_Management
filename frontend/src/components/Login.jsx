import React, { useState } from 'react';
import PhoneSection from './Login/PhoneSection';
import OtpSection from './Login/OtpSection';
import EmailSection from './Login/EmailSection';  
import GoogleSection from './Login/GoogleSection';
import UserDetailsSection from './Login/UserDetailsSection';

function Login() {
  const [loginMethod, setLoginMethod] = useState('phone');
  const [previousMethod, setPreviousMethod] = useState('');
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  const saveUserToMongoDB = (data) => {
    console.log('Saving to MongoDB:', data);
    // Perform actual save with fetch or Axios
  };
  
  const handlePhoneSubmit = () => {
    if (!phone.trim()) {
      alert('Please enter a phone number');
      return;
    }
    console.log('Sending OTP to:', phone);
    setStep(2);
  };
  
  const handleOtpSubmit = () => {
    if (!otp.trim()) {
      alert('Enter the received OTP');
      return;
    }
    console.log('Verifying OTP:', otp);
    setStep(3);
  };
  
  const handleEmailSubmit = () => {
    if (!email.trim() || !password.trim()) {
      alert('Email and password are required');
      return;
    }
    console.log('Logging in with email:', email);
    setStep(3);
  };
  
  const handleAlternativeLogin = (method) => {
    console.log(`Logging in with ${method}`);
    setStep(3);
  };
  
  const handleUserDetailsSubmit = () => {
    if (!userDetails.name.trim() || !userDetails.email.trim()) {
      alert('Please fill in your details');
      return;
    }
    saveUserToMongoDB({ phone, email, ...userDetails, loginMethod });
    console.log('User details saved:', userDetails);
  };
  
  const switchLoginMethod = (method) => {
    setPreviousMethod(loginMethod);
    setLoginMethod(method);
    setStep(1);
    setPhone('');
    setOtp('');
    setEmail('');
    setPassword('');
    setUserDetails({ name: '', email: '' });
  };
  
  const methodNames = {
    phone: 'Phone',
    google: 'Google',
    email: 'Email',
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to Airbnb</h1>
          <button className="text-gray-500 text-xl">×</button>
        </div>
        <h2 className="text-lg font-semibold mb-4">Log in or sign up</h2>

        {loginMethod === 'phone' && step === 1 && (
          <PhoneSection
            phone={phone}
            setPhone={setPhone}
            handlePhoneSubmit={handlePhoneSubmit}
          />
        )}
        {loginMethod === 'phone' && step === 2 && (
          <OtpSection otp={otp} setOtp={setOtp} handleOtpSubmit={handleOtpSubmit} />
        )}
        {loginMethod === 'email' && step === 1 && (
          <EmailSection
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleEmailSubmit={handleEmailSubmit}
          />
        )}
        {loginMethod === 'google' && step === 1 && (
          <GoogleSection handleAlternativeLogin={handleAlternativeLogin} />
        )}
        {step === 3 && (
          <UserDetailsSection
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleUserDetailsSubmit={handleUserDetailsSubmit}
          />
        )}
  
        {step < 3 && (
          <>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
  
            {['google', 'email', 'phone'].map((method) =>
              method !== loginMethod ? (
                <button
                  key={method}
                  onClick={() => switchLoginMethod(method)}
                  className="flex items-center w-full p-3 border rounded mb-2 hover:bg-gray-100"
                >
                  <span className="mr-2">{method === 'google' ? 'G' : method === 'email' ? '✉️' : '📞'}</span>
                  Continue with {previousMethod === method ? methodNames[previousMethod] : methodNames[method]}
                </button>
              ) : null
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

