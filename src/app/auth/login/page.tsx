'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import pctLogo from '@/images/logos/logo.png'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <Image
            className="mx-auto h-40 w-auto"
            src={pctLogo}
            alt="Your Company"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
            Bắt Đầu Ngay
          </h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div className="relative -space-y-px rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 "
              >
                Ghi nhớ tài khoản
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 ring-2   hover:bg-gray-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="text-center text-sm leading-6 text-gray-500">
          Chưa phải là thành viên?
          <Link
            href="/auth/signup"
            className="font-semibold text-[#1F53A4] hover:text-[#5987d1]"
          >
            &nbsp; Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
