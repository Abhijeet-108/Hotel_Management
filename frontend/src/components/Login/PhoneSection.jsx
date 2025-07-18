import React from 'react';

function PhoneSection({ phone, setPhone, handlePhoneSubmit }) {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Country/Region</label>
        <select
          className="w-full p-2 border rounded"
          value={phone?.countryCode ?? "+91"}
          onChange={(e) =>
            setPhone({ ...phone, countryCode: e.target.value })
          }
        >
          <option value="+91">India (+91)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Phone number</label>
        <input
          type="text"
          value={phone?.phoneNumber ?? ""} 
          onChange={(e) =>
            setPhone({ ...phone, phoneNumber: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Enter phone number"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4 font-semibold">
        We'll call or text you to confirm your number. Standard message and data rates apply.
        <a href="#" className="text-black">Privacy Policy</a>.
      </p>

      <button
        onClick={handlePhoneSubmit}
        className="w-full bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600"
      >
        Continue
      </button>
    </div>
  );
}

export default PhoneSection;
