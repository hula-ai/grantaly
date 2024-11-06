import { LockClosedIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Component } from 'react';

interface Props {
    stepUp: () => void
    stepDown: () => void
    setEmail: () => void
    email : string
}


const EmailChange = ({stepUp, stepDown}:Props) => {
    return(
        <form className="space-y-4" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-3">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Email Address"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={stepUp}
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
        </form>
    )
}

export default EmailChange;