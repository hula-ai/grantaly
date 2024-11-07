'use client'
import { LockClosedIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { useState } from 'react';
import { Component } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
    stepUp: () => void
    stepDown: () => void
    setEmail: (e:string) => void
    email : string
}


const EmailChange = ({email,setEmail,stepUp, stepDown}:Props) => {

  const [loading,setLoading] = useState(false);

  const testEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  

  const sendResetLink = async () => {
    if (testEmail(email)) {
      setLoading(true)
      try {
        const response = await axios.post('/api/auth/forgotpassword', { email });
        if (response.status === 200) {
          toast.success('Reset link sent successfully!');
          stepUp();
        } else {
          toast.error('Something went wrong, please try again.');
        }
      } catch (error) {
        toast.error('Error sending reset link. Please try again.');
        console.error(error);
      } finally {
        setLoading(false)
      }
    } else {
      toast.error('Please enter a valid email');
    }
  };
  

    return(
        <>
          <div className="rounded-md shadow-sm space-y-3">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              required
              disabled={loading}
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Email Address"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={sendResetLink}
              className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm font-semibold text-white hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                  aria-hidden="true"
                />
              </span>
              Send Reset Link
            </button>
          </div>
        </>
    )
}

export default EmailChange;