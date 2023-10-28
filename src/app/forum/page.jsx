/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  PhotoIcon,
  GifIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  HeartIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import CreateForumModal from './Modal/CreateForumModal'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import LoadingE from '@/components/Loading/LoadingE'
import './animation.css'
import { formatTimeStamp } from '@/lib/formatTimestamp'

export default function Forum() {
  const [modalIsOpen, setIsOpen] = useState(false)

  const session = useSession()
  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/forum`, fetcher)

  const handleUpdateReact = async (id) => {
    const hasReacted =
      (await data) &&
      data.map((item) => {
        item.react.some((react) => react.userID === session.data.id)
      })
    // Unlike
    if (hasReacted) {
      try {
        await fetch(`/api/forum/react/delete/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            userID: session.data.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        mutate()
      } catch (error) {
        console.error('Error updating rating:', error)
      }
    } else {
      //Like
      try {
        await fetch(`/api/forum/react/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            userID: session.data.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        mutate()
      } catch (error) {
        console.error('Error updating rating:', error)
      }
    }
  }

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
              className="my-16  items-center rounded-lg px-4 py-3 ring-1 ring-gray-200 dark:bg-black dark:ring-gray-700"
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
          .map((post, index) => (
            <div
              className="mx-auto mt-6 max-w-md rounded-lg border p-4 ring-1 ring-gray-100 dark:bg-black dark:ring-gray-700  sm:max-w-xl"
              key={post._id}
            >
              <div className="flex items-center px-4 py-3">
                <img className="h-8 w-8 rounded-full" src={post.authorAvatar} />
                <div className="ml-3 ">
                  <span className="block text-sm font-semibold leading-tight antialiased">
                    {post.author}
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {formatTimeStamp(post.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 dark:text-white">{post.content}</p>
              <img src={post.imgSrc} className="my-2" />
              <div className="mx-4 mb-2 mt-3 flex items-center justify-between">
                <div className="flex gap-4">
                  <span
                    className=" h-6 w-6 cursor-pointer "
                    onClick={() => {
                      handleUpdateReact(post._id)
                    }}
                  >
                    {post.react.some(
                      (rating) => rating.userID === session.data.id,
                    ) ? (
                      <SolidHeartIcon className="h-6 w-6 text-[#FF3140]" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </span>
                  <ChatBubbleOvalLeftIcon className="h-6 w-6" />{' '}
                  <PaperAirplaneIcon className="h-6 w-6 -rotate-12" />
                </div>

                <div className="flex">
                  <BookmarkIcon className="h-6 w-6 " />
                </div>
              </div>
              <div className="mx-4 mb-2 mt-2 text-sm font-semibold">
                {post.react.length} likes
              </div>
              <div className="mx-4 text-sm font-medium text-gray-500">
                <p className="cursor-pointer">
                  View all {post.comment.length} comments
                </p>

                <div>
                  <input
                    placeholder="Add a comment..."
                    className="my-2 bg-transparent font-normal text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

        {modalIsOpen && (
          <CreateForumModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            reload={mutate}
          />
        )}
      </div>
    )
  }
}
