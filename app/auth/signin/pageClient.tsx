'use client'
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn function
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { IconType } from "react-icons";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to manage errors
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if(result.ok) {
      toast.success("User logged in successfully")
      router.refresh();
      setTimeout(() => {
        window.location.href = '/'; // Redirects to the homepage
      }, 3000)
    } else {
      toast.error("Invalid credentials")
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google",  {
      redirect: false, 
      callbackUrl: '/', 
    }).then((callback) => {
      console.log(callback,'I am callback')
      if (callback?.error) {
        toast.error(callback.error);
      } else{
          toast.success("User logged in successfully");
      } 
    }).catch((err) => {
      toast.error('Error occured in google sign in')
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300 ">
        <div className="text-center">
          <Link href="/">
            <Image
              className="mx-auto h-10 w-auto cursor-pointer"
              src="/assets/logo/logo-b.svg"
              alt="Company"
              height={2000}
              width={2000}
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Please enter your credentials.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        </div>
        <div className="rounded-md shadow-sm space-y-3">
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)} // Handle input change
            className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Email Address"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)} // Handle input change
            className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Password"
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

          <div className="text-sm">
            <Link href={'/auth/forgotpassword'}>
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="group relative flex w-full justify-center rounded-md bg-gradient-to-r 
            from-blue-500 to-indigo-600 py-2 text-sm font-semibold text-white
            hover:from-indigo-500 hover:to-blue-500 focus:outline-none
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 py-2 text-sm font-semibold text-white hover:from-blue-500 hover:via-red-400 hover:to-yellow-400 hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <span className="mr-2 ">
              <FcGoogle size={24} />
            </span>
            Sign in with Google
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href={'/auth/signup'}>
            <p className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
