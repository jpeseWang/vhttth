import Image from 'next/image'
import React from 'react'

import img1 from './images/img1.jpeg'
import img2 from './images/img2.jpeg'
import img3 from './images/img3.jpeg'
import img4 from './images/img4.jpeg'
import img5 from './images/img5.jpeg'
import img6 from './images/img6.jpg'
import img7 from './images/img7.jpeg'

const posts = [
  {
    title: 'Những điều cần biết về trường',
    href: 'categories/sec1',
    category: { name: 'Article', href: '#' },
    description:
      'Các thông tin cơ bản về trường học, bao gồm vị trí, cơ sở vật chất, các dịch vụ và tiện ích, lịch học, và các quy định quan trọng mà học sinh và phụ huynh cần biết.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl: img1,
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Truyền thống học tập theo tư tưởng “Chi bằng học"',
    href: 'categories/sec2',
    category: { name: 'Video', href: '#' },
    description:
      'Triết lý học tập của trường, với thông điệp rằng học tập là ưu tiên hàng đầu. Nó có thể nêu rõ cách trường tạo điều kiện để học sinh phát triển kiến thức và kỹ năng.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl: img2,
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Hoạt động ngoại khoá - nơi phong trào thăng hoa',
    href: 'categories/sec3',
    category: { name: 'Case Study', href: '#' },
    description:
      'Nêu bật vai trò của hoạt động ngoại khoá trong việc phát triển học sinh. Nó có thể đề cập đến các hoạt động và chương trình ngoại khoá mà học sinh có thể tham gia để phát triển tài năng và sở thích cá nhân.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl: img7,
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Tự hào là học sinh Phan Châu Trinh!',
    href: 'categories/sec4',
    category: { name: 'Case Study', href: '#' },
    description:
      'Thể hiện tinh thần tự hào của học sinh đối với trường Phan Châu Trinh. Có thể bao gồm những thành tựu và giá trị mà trường mong muốn học sinh thể hiện khi họ là học sinh tại đây.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl: img3,
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function Example() {
  return (
    <div className="relative  px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="absolute inset-0">
        <div className="h-1/3  sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Điều gì đã tạo nên thương hiệu Phan Châu Trinh?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Hãy cùng chúng mình tìm hiểu xem trường ta đã dày công xây dựng
            thương hiệu vững chắc như thế nào nhé!
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1F53A4]">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                  </a>
                </div>
                {/* <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
