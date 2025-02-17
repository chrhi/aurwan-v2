"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { syncAccountAction } from "@/actions/auth.actions"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleSync = async () => {
      try {
        const success = await syncAccountAction()

        if (success) {
          // If there's a redirect URL in the query params, use it
          const redirectUrl = "/"
          router.push(redirectUrl)
        } else {
          router.push("/sign-up")
        }
      } catch (error) {
        console.error("Error during account sync:", error)
        router.push("/sign-up")
      }
    }

    handleSync()
  }, [router])

  return (
    <div
      aria-label="Loading"
      aria-describedby="loading-description"
      className="w-full h-screen flex flex-col items-center justify-center gap-y-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="100"
        height="100"
      >
        <radialGradient
          id="a9"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stop-color="#1da1f2"></stop>
          <stop offset=".3" stop-color="#1da1f2" stop-opacity=".9"></stop>
          <stop offset=".6" stop-color="#1da1f2" stop-opacity=".6"></stop>
          <stop offset=".8" stop-color="#1da1f2" stop-opacity=".3"></stop>
          <stop offset="1" stop-color="#1da1f2" stop-opacity="0"></stop>
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a9)"
          stroke-width="27"
          stroke-linecap="round"
          stroke-dasharray="200 1000"
          stroke-dashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="1.3"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#1da1f2"
          stroke-width="27"
          stroke-linecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>

      <p className="font-bold text-lg">we are setting up your account...</p>
      <p className="text-gray-500 text-sm ">please wait a moment </p>
    </div>
  )
}
