import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../context/userContext';
import { FaArrowLeft } from 'react-icons/fa';
import { useOtpData } from '../../context/OtpContext';

function UserDetailsSection({ handleBack }) {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { userData } = useContext(UserDataContext);

  const { login } = useOtpData();

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();

    if (!fullname.trim() || !email.trim() || !password.trim()) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const payload = {
        action: 'register_phone_user',
        email,
        password,
        fullName: fullname,
        phone: {
          countryCode: userData.phone?.countryCode,
          phoneNumber: userData.phone?.phoneNumber,
        },
      };
      console.log('Register payload:', payload);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
        payload
      );

      if (response.data && response.data.data) {
        login(response.data.data);
        alert('User registered successfully!');
        navigate('/');
      }
    } catch (error) {
      alert(error?.response?.data?.message || 'Error registering user. Try again.');
      console.error(error);
    } finally {
      setEmail('');
      setPassword('');
      setFullname('');
    }
  };

  return (
    <div className='rounded-lg '>
      <div className='flex justify-between items-center mb-4 w-full'>
        <FaArrowLeft
          onClick={handleBack}
          className='cursor-pointer text-gray-700 text-xl'
        />
        <h2 className='text-lg font-semibold text-center w-full'>Finish signing up</h2>
      </div>
      <hr className='my-2 border-gray-100' />

      <form
        onSubmit={handleUserDetailsSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-semibold">Legal name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your name"
            required
          />
          <p className='text-xs font-semibold text-gray-500'>
            Make sure this matches the name on your government ID. If you go by another name, you can add a{' '}
            <a href="#" className='underline'>preferred first name</a>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
          />
        </div>

        <p className='text-xs text-gray-500 mb-4 font-light'>
          By selecting <b className='font-semibold'>Agree and continue</b>, I agree to StayFinder's{' '}
          <a href="#" className='underline font-semibold text-blue-400'>Terms of Service</a> and{' '}
          <a href="#" className='underline font-semibold text-blue-400'>Privacy Policy</a>.
        </p>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
        >
          Agree and continue
        </button>
      </form>
    </div>
  );
}

export default UserDetailsSection;
