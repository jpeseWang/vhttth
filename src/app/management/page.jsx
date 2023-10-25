'use client'
import React from 'react'

import { Fragment, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import useSWR from 'swr'
import { classNames } from '@/lib/classNames'

import PostCreateModal from './Modal/PostCreateModal'
import Link from 'next/link'

const navigation = [
  { name: 'Posts', href: '#', icon: FolderIcon, current: true },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

const secondaryNavigation = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]
const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [categorySelect, setCategorySelect] = useState(
    'Những điều cần biết về trường',
  )
  function closeModal() {
    setIsOpen(false)
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher)

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      toast('Delete post successfully!', {
        icon: '👏',
      })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="mx-auto mt-10 max-w-7xl md:px-14 lg:px-8">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white dark:bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center"></div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0  xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6 ring-1 ring-white/5 dark:bg-black/10">
            <div className="flex h-16 shrink-0 items-center"></div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 dark:text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 focus:ring-0 dark:text-white sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main>
            <header>
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={item.current ? 'text-indigo-400' : ''}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Heading */}
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 dark:bg-gray-700/10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full p-1 text-green-400 dark:bg-green-400/10">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h1 className="flex gap-x-3 text-base leading-7">
                      <span className="font-semibold dark:text-white">
                        Planetaria
                      </span>
                      <span className="text-gray-600">/</span>
                      <span className="font-semibold dark:text-white">
                        mobile-api
                      </span>
                    </h1>
                  </div>
                  <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-lg font-semibold leading-7 dark:text-white">
                      Chọn danh mục
                    </h1>
                    <select
                      className="ml-6 rounded px-0.5 py-1 ring-1"
                      onChange={(e) => {
                        setCategorySelect(e.target.value)
                      }}
                    >
                      <option>Những điều cần biết về trường</option>
                      <option>
                        Truyền thống học tập theo tư tưởng Chi bằng học
                      </option>
                      <option>
                        Hoạt động ngoại khoá - nơi phong trào thăng hoa
                      </option>
                      <option>Tự hào là học sinh Phan Châu Trinh!</option>
                    </select>
                  </header>
                </div>
                <div
                  className="order-first flex-none cursor-pointer rounded-full px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/30 dark:bg-indigo-400/10 sm:order-none"
                  onClick={() => {
                    setIsOpen(true)
                  }}
                >
                  Tạo bài đăng mới
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 dark:bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1
                        ? 'sm:border-l'
                        : statIdx === 2
                        ? 'lg:border-l'
                        : '',
                      'border-t px-4 py-6 dark:border-white/5 sm:px-6 lg:px-8',
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400">
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight dark:text-white">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-sm dark:text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            {/* Activity list */}
            <div className="border-t pt-11 dark:border-white/10">
              <h2 className="px-4 text-base font-semibold leading-7 dark:text-white sm:px-6 lg:px-8">
                Latest activity
              </h2>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="lg:w-6/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 dark:text-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                    >
                      Title
                    </th>

                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Create date
                    </th>

                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y dark:divide-white/5">
                  {data
                    ?.filter((p) => p.category === categorySelect)
                    .map((item) => (
                      <tr key={item.commit}>
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-x-4">
                            <img
                              src={item.imgSrc}
                              alt=""
                              className="h-8 w-8 rounded-full bg-gray-800"
                            />
                            <Link
                              href={`/categories/post/${item._id}`}
                              className="truncate text-sm font-medium leading-6 dark:text-white"
                            >
                              {item.title.slice(0, 60)}
                            </Link>
                          </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                          <div className="flex gap-x-3">
                            <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                              {item.datetime}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pl-2  text-sm leading-6 ">
                          <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                            {/* <select>
                              <option>
                                Edit <TrashIcon className="h-6 w-6" />
                              </option>
                              <option onClick={() => handleDelete(item._id)}>
                                Delete <TrashIcon className="h-6 w-6" />
                              </option>
                            
                            </select> */}
                            <div className="flex flex-none items-center gap-x-4">
                              <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                  <span className="sr-only">Open options</span>

                                  <a
                                    href="#"
                                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                  >
                                    Actions
                                  </a>
                                </Menu.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item className="cursor-pointer hover:bg-gray-100">
                                      {({ active }) => (
                                        <div
                                          className={classNames(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                                          )}
                                        >
                                          <span className="inline ">
                                            <PencilSquareIcon className="inline h-6 pr-1 text-blue-500" />
                                            Edit
                                          </span>
                                        </div>
                                      )}
                                    </Menu.Item>

                                    <Menu.Item className="cursor-pointer hover:bg-gray-100">
                                      {({ active }) => (
                                        <div
                                          className={classNames(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                                          )}
                                          onClick={() => handleDelete(item._id)}
                                        >
                                          <TrashIcon className="inline h-6 pr-1 text-red-500" />
                                          Delete
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
        {modalIsOpen && (
          <PostCreateModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            reload={mutate}
          />
        )}
      </div>
    </>
  )
}
