import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <div className="text-center">
          <img
            className="mx-auto h-10 w-auto"
            src="/assets/logo/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join us today! It takes only a few steps.
          </p>
        </div>
        <form className="space-y-4" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-3">
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="First Name"
            />
            <input
              id="last-name"
              name="lastName"
              type="text"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Last Name"
            />
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Contact"
            />
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Email Address"
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Password"
            />
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-xs text-gray-600"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm font-semibold text-white hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                  aria-hidden="true"
                />
              </span>
              Register Now
            </button>
          </div>
        </form>
        <p className="mt-3 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href={'/Auth/SignIn'}>
            <p className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
