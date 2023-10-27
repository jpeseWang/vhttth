/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useState } from 'react'
import {
  PhotoIcon,
  GifIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import ConfirmationModal from './Modal/ConfirmationModal'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import LoadingE from '@/components/Loading/LoadingE'
import Heart from 'react-animated-heart'
import { formatTimeStamp } from '@/lib/formatTimestamp'

export default function Forum() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isClick, setClick] = useState(false)
  const session = useSession()
  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/forum`, fetcher)
  if (session.status === 'loading') {
    return <LoadingE />
  }
  if (session.status === 'unauthenticated') {
    router?.push('/auth/login')
  }
  if (session.status === 'authenticated') {
    return (
      <div className="sm:mt-22 mx-auto mt-16">
        {session.status === 'authenticated' && (
          <div className="mx-auto max-w-lg ">
            <div
              className="my-16  items-center rounded-lg px-4 py-3 ring-1 ring-gray-200 dark:bg-black"
              onClick={() => {
                setIsOpen(true)
              }}
            >
              <div className="flex items-center px-4 py-3">
                <img
                  className="h-10 w-10 rounded-full"
                  src={session.data.avatar}
                />
                <div className="ml-3 ">
                  <input
                    placeholder="What is happening ?!"
                    className="bg-transparent outline-none placeholder:text-lg"
                  />
                  <span className="block text-lg text-gray-600 dark:text-gray-300"></span>
                </div>
              </div>
              <div className="ml-14 mt-4 flex justify-between px-2">
                <div className="flex cursor-pointer">
                  {' '}
                  <PhotoIcon className="mx-1 h-5 w-auto text-[#1C9BEF]" />
                  <GifIcon className="h-5 w-auto text-[#1C9BEF]" />
                  <AdjustmentsHorizontalIcon className="mx-1 h-5 w-auto text-[#1C9BEF]" />{' '}
                  <ChatBubbleLeftIcon className="h-5 w-auto text-[#1C9BEF]" />
                </div>
                <button className="rounded-full bg-[#1C9BEF] px-2.5 py-1 font-semibold text-white hover:opacity-50">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card */}
        {data
          ?.slice()
          .reverse()
          .map((post) => (
            <div
              className="mx-auto mt-6 max-w-md rounded-lg border bg-white p-4 ring-1 ring-gray-100 dark:bg-black dark:ring-gray-900 dark:ring-transparent sm:max-w-xl"
              key={post._id}
            >
              <div className="flex items-center px-4 py-3">
                <img className="h-8 w-8 rounded-full" src={post.authorAvatar} />
                <div className="ml-3 ">
                  <span className="block text-sm font-semibold leading-tight antialiased">
                    {post.author}
                  </span>
                  <span className="block text-xs text-gray-600">
                    {formatTimeStamp(post.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 dark:text-white">{post.content}</p>
              <img src={post.imgSrc} className="my-2" />
              <div className="mx-4 mb-2 mt-3 flex items-center justify-between">
                <div className="flex gap-5">
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                  </svg>
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                  </svg>
                </div>
                <div className="flex">
                  {/* <span className=" h-4 w-4 justify-start">
        
                    <Heart
                      isClick={isClick}
                      onClick={() => setClick(!isClick)}
                    />
                  </span> */}

                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                  </svg>
                </div>
              </div>
              <div className="mx-4 mb-4 mt-2 text-sm font-semibold">
                {post.react.length} likes
              </div>
            </div>
          ))}
        {/* <div className="mx-auto max-w-md rounded-lg border bg-white p-4 ring-1 ring-gray-100 dark:bg-black dark:ring-gray-900 dark:ring-transparent sm:max-w-xl">
          <div className="flex items-center px-4 py-3">
            <img
              className="h-8 w-8 rounded-full"
              src="https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/393262091_860083485689587_5076060197556059409_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=giP4cj3Y4xwAX-A5kf1&_nc_ht=scontent.fdad3-6.fna&oh=03_AdQQsaBlr9iDMb6K2VX7aXqV1YEWMa8_CJNw9P2W58Ngag&oe=655623DB"
            />
            <div className="ml-3 ">
              <span className="block text-sm font-semibold leading-tight antialiased">
                Nguyễn Thanh Tâm
              </span>
              <span className="block text-xs text-gray-600">
                THPT Phan Châu Trinh, Đà Nẵng
              </span>
            </div>
          </div>
          <p className="my-2 text-gray-800 dark:text-white">
            Vậy là năm học 2023-2024 đã bắt đầu. PCT MEDIA team chúc các bạn học
            sinh sẽ có một năm học suôn sẻ, thành công rực rỡ và luôn sống hết
            mình với mái nhà mang tên Phan Châu Trinh.
          </p>
          <img src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/393260773_715247617314329_890145939305921339_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=w61olYN8BTcAX-QOGho&_nc_ht=scontent.fdad3-1.fna&oh=00_AfCsBrTNo4MAxDV6U0LPDnL0bxWBS-7bfeHRor3ft5GkbQ&oe=6539FB8F" />
          <div className="mx-4 mb-2 mt-3 flex items-center justify-between">
            <div className="flex gap-5">
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path
                  clip-rule="evenodd"
                  d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </div>
            <div className="flex">
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
              </svg>
            </div>
          </div>
          <div className="mx-4 mb-4 mt-2 text-sm font-semibold">
            2,372 likes
          </div>
        </div> */}

        {modalIsOpen && (
          <ConfirmationModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            reload={mutate}
          />
        )}
      </div>
    )
  }
}
