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
  
  const handleBack = () => {
    setStep(1);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center items-center mb-6 pb-4 border-b-2">
            <h1 className="text-lg font-semibold">Log in or sign up</h1>
          </div>
          <h2 className="text-lg font-semibold mb-4">Welcome to StayFinder</h2>

          {loginMethod === 'phone' && (
            <PhoneSection
              phone={phone}
              setPhone={setPhone}
              handlePhoneSubmit={handlePhoneSubmit}
            />
          )}
          
          {loginMethod === 'email' && (
            <EmailSection
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleEmailSubmit={handleEmailSubmit}
            />
          )}
          
          {loginMethod === 'google' && (
            <GoogleSection handleAlternativeLogin={handleAlternativeLogin} />
          )}

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
                <span className="mr-2 rounded-sm">
                  {method === 'google' ? 'G' : method === 'email' ? '✉️' : '📞'}
                </span>
                Continue with {previousMethod === method ? methodNames[previousMethod] : methodNames[method]}
              </button>
            ) : null
          )}
        </div>
      )}
      
      {step === 2 && loginMethod === 'phone' && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <OtpSection
            otp={otp}
            setOtp={setOtp}
            handleOtpSubmit={handleOtpSubmit}
            PhoneNumber={phone}
            handleBack={handleBack}
          />
        </div>
      )}
      
      {step === 3 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <UserDetailsSection
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleUserDetailsSubmit={handleUserDetailsSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default Login;