"use client";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn function
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      toast.success("Password reset successfully")
      router.push("/auth/signin");
    } else {
      setMessage(data.message);
      toast.error("Invalid or expired token")
    }
  };

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to manage errors


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300 ">
        <div className="text-center">
          <Link href="/">
            <Image
              className="mx-auto h-10 w-auto cursor-pointer"
              src="/assets/logo/logo.png"
              alt="Company"
              height={2000}
              width={2000}
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
            Reset your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Please change your password.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          {/* Display error message */}
        </div>
        <div className="rounded-md shadow-sm space-y-3">
          <input
            id="new-password"
            name="newpassword"
            type="password"
            required
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)} // Handle input change
            className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Enter password"
          />
          <input
            id="confirm-password"
            name="confirmpassword"
            type="password"
            required
            value={confirmPassword} // Controlled input
            onChange={(e) => setConfirmPassword(e.target.value)} // Handle input change
            className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Re-Enter your password"
          />
        </div>

        <div>
          <button
            onClick={handleReset}
            className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm font-semibold text-white hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                aria-hidden="true"
              />
            </span>
            Reset Passowrd
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
