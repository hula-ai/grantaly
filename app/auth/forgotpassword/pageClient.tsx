'use client'
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EmailChange from "./emailChange";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  const stepUp = () => {
    if (step < 2)
    setStep( val => val+1 )
  }
  const stepDown = () => {
    if (step > 0)
    setStep( val => val-1 )
  }

  const textArray = [
    "Enter your email address below and we will send you a password reset link to your email",
    "Password reset link has been sent to your email"
  ]
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <div className="text-center">
        <Link href="/">
            <Image
              className="mx-auto h-10 w-auto cursor-pointer"
              src="/assets/logo/logo-b.svg"
              alt="Company"
              width={2000}
              height={2000}
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
            Reset Your Password
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {textArray[step]}
          </p>
        </div>
        {step === 0 ? <EmailChange email={email} setEmail={setEmail} stepUp = {stepUp} stepDown = {stepDown}/>  : null}
        <p className="mt-3 text-center text-xs text-gray-500">
          Remembered your password?{" "}
          <Link href={'/auth/signin'}>
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;