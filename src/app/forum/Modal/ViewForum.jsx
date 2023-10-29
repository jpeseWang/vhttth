'use client'

import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { TrashIcon } from '@heroicons/react/24/solid'
import EmojiPicker from 'emoji-picker-react'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import '@/styles/model.css'
import { classNames } from '@/lib/classNames'
import {
  XMarkIcon,
  FaceSmileIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import LoadingE from '@/components/Loading/LoadingE'
import { Tab } from '@headlessui/react'
import { formatTimeStamp } from '@/lib/formatTimestamp'
export const customStyles = {
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
}

export default function ViewForumModal({ isOpen, onClose, reload, params }) {
  const [isError, setIsError] = useState(false)
  const [isOpenEmoji, setIsOpenEmoji] = useState(false)
  const [isInputCommentOpen, setIsInputCommentOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  //Emoji
  const [selectedEmoji, setSelectedEmoji] = useState('1f60a')
  const [inputValue, setInputValue] = useState('')

  function onChangeEmoji(emojiData, event) {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
    )
    setSelectedEmoji(emojiData.unified)
  }

  let date = new Date().toUTCString().slice(5, 16)
  let datetime = new Date(date).toISOString().slice(0, 10)
  const session = useSession()
  const router = useRouter()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(
    `/api/forum/${params}`,
    fetcher,
  )
  console.log('model', params)

  if (session.status === 'unauthenticated') {
    router?.push('/auth/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUploading(true)

    try {
      await fetch(`/api/forum/comment/${params}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: session.data.fullname,
          userID: session.data.id,
          avatar: session.data.avatar,
          content: inputValue,
          date,
        }),
      })

      reload()
      e.target.reset()
      setUploading(false)
    } catch (err) {
      console.log(err)
      setUploading(false)
      toast.error('Something went wrong!')
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {isLoading ? (
        <LoadingE />
      ) : (
        <div className="bg-white">
          <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="absolute right-0 top-0 hidden pr-10 pt-10 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => onClose()}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* Product */}
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Product image */}
              <div className="lg:col-span-4 lg:row-end-1">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={data.imgSrc}
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Product details */}
              <div className="mx-auto mt-14 max-w-4xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <div className="flex items-center py-3">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={data.authorAvatar}
                      />
                      <div className="ml-3 ">
                        <span className="block text-sm font-semibold leading-tight antialiased">
                          {data.author}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeStamp(data.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-gray-500">{data.content}</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <button
                    type="button"
                    className="hover:opacity-0.5 flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    {data.react.length} likes
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() => {
                      setIsInputCommentOpen(!isInputCommentOpen)
                    }}
                  >
                    Write a comment
                  </button>
                </div>
                {isInputCommentOpen && (
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <div className="prose-sm prose text-gray-500">
                      <div className="flex items-start space-x-4 bg-white">
                        <div className="flex-shrink-0">
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={session.data.avatar}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form onSubmit={handleSubmit} className="relative">
                            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                              <label htmlFor="comment" className="sr-only">
                                Add your comment
                              </label>
                              <textarea
                                rows={3}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent px-1.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Add your comment..."
                                onChange={(e) => {
                                  setInputValue(e.target.value)
                                  console.log(inputValue)
                                }}
                                value={inputValue}
                              />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                              <div className="flex items-center space-x-5">
                                <div className="flex items-center">
                                  <div>
                                    <>
                                      <div className="relative">
                                        <button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                          <span className="flex items-center justify-center">
                                            <span>
                                              <FaceSmileIcon
                                                className="h-5 w-5 flex-shrink-0"
                                                aria-hidden="true"
                                                onClick={() => {
                                                  setIsOpenEmoji(!isOpenEmoji)
                                                }}
                                              />
                                              <span className="sr-only">
                                                Add your mood
                                              </span>
                                            </span>
                                          </span>
                                        </button>
                                      </div>
                                      <div className="absolute mb-36 sm:ml-6">
                                        {isOpenEmoji && (
                                          <EmojiPicker
                                            height={390}
                                            width={350}
                                            onEmojiClick={onChangeEmoji}
                                            autoFocusSearch={false}
                                          />
                                        )}
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="submit"
                                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                <Tab.Group as="div">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                            'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                          )
                        }
                      >
                        Comments
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    <Tab.Panel className="-mb-10">
                      <h3 className="sr-only">Write your own comment</h3>
                      {data.comment.length > 0 ? (
                        <>
                          {data.comment
                            .slice()
                            .reverse()
                            .map((review, reviewIdx) => (
                              <div
                                key={review.id}
                                className="flex space-x-4 text-sm text-gray-500"
                              >
                                <div className="flex-none py-10">
                                  <img
                                    src={review.avatar}
                                    alt=""
                                    className="h-10 w-10 rounded-full bg-gray-100"
                                  />
                                </div>
                                <div
                                  className={classNames(
                                    reviewIdx === 0
                                      ? ''
                                      : 'border-t border-gray-200',
                                    'py-10',
                                  )}
                                >
                                  <h3 className="font-medium text-gray-900">
                                    {review.name}
                                  </h3>
                                  <p>
                                    <time dateTime={review.datetime}>
                                      {review.date}
                                    </time>
                                  </p>

                                  <div className="prose-sm prose mt-4 max-w-none text-gray-500">
                                    {review.content}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </>
                      ) : (
                        <p className="mt-4 text-gray-500">No comment yet</p>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
