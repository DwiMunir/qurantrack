"use client";

import { QuranIcon } from "@/components/icons/quran-icon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const handleLogin = () => {
    signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-teal-300 to-blue-500">
      <div className="w-full max-w-md space-y-8">
        {/* Authentication Card */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 space-y-6">
          {/* Logo Area */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-full shadow-md">
              <QuranIcon className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
              QuranTrack
            </h1>
            <p className="mt-1 text-gray-600 text-center">
              Track your Quran reading progress effortlessly
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
