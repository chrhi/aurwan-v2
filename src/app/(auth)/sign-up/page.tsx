import { SignUpForm } from "@/components/forms/auth/sign-up.form";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden w-1/2 bg-blue-600 md:block">
        <div className="relative h-full w-full">
          <Image
            src="/api/placeholder/1200/1600"
            alt="Sign up illustration"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 className="mb-2 text-3xl font-bold">Join our community</h2>
            <p className="text-lg">
              Discover all the amazing features our platform has to offer.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-4 md:w-1/2 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          {/* Logo/Brand */}
          <div className="mb-6 flex items-center justify-center md:justify-start">
            <div className="rounded-full bg-blue-600 p-2">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              Your Brand
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <SignUpForm />

          {/* Terms notice */}
          <p className="mt-4 text-center text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
