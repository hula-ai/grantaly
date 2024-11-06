'use client';
import { SignUpValidation } from "@/Validation/Client/signup-validation";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation
    const { value, error } = SignUpValidation.validate(formData, { abortEarly: false });


    if (error) {
      // Show the first error message in a toast
      toast.error(error.details[0].message);
      return;
    }

    console.log(error,'ajdbefduj')
    setLoading(true);

    try {
      // Make API call to register the user
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        // Redirect to sign-in page after successful registration
        router.push("/auth/signin");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <div className="text-center">
          <Link href="/">
            <Image
              className="mx-auto h-10 w-auto cursor-pointer"
              src="/assets/logo/logo.png"
              alt="Company"
              width={2000}
              height={2000}
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join us today! It takes only a few steps.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-3">
            <input
              id="first-name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="First Name"
            />
            <input
              id="last-name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Last Name"
            />
            <input
              id="contact"
              name="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Contact"
            />
            <input
              id="email-address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Email Address"
            />
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Password"
            />
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-sm font-semibold text-white hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100"
                  aria-hidden="true"
                />
              </span>
              {loading ? "Signing Up..." : "Register Now"}
            </button>
          </div>
        </form>
        <p className="mt-3 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/signin">
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
