import React from 'react'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import coverImage from '@/images/coverImg.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={coverImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Tự hào là học sinh <br></br>Phan Châu Trinh!
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <ul className="my-4 text-lg italic">
              <li>
                Học sinh Phan Châu Trinh, cất cao lời hát kết đoàn cùng tiến lên
              </li>
              <li>Yêu thương mái trường, dựng xây đất nước</li>
              <li>Truyền thống Phan Châu Trinh muôn đời còn ghi nhớ mãi! </li>
              <p className="mt-2 text-sm">
                (Hành khúc học sinh Phan Châu Trinh)
              </p>
            </ul>
            <p>
              Dự án này là một nỗ lực hết sức quan trọng để tìm hiểu và nắm bắt
              những góc nhìn và tâm tư của học sinh, giúp chúng ta hiểu rõ hơn
              về văn hoá truyền thống trong ngôi trường của chúng ta. Chúng ta
              cũng hy vọng sẽ tạo ra những giải pháp mới mẻ để phát triển môi
              trường học đường và tạo ra một nền văn hóa vượt trội.
            </p>
            <p>
              Trang web này sẽ cung cấp thông tin chi tiết về dự án, mục tiêu,
              và phạm vi nghiên cứu. Bạn sẽ có cơ hội theo dõi quá trình tiến
              hành dự án, xem xét những phát hiện quan trọng và những câu chuyện
              đáng chú ý từ học sinh tham gia. Chúng tôi sẽ liệt kê các tài liệu
              và bài viết quan trọng về vấn đề này, giúp bạn hiểu sâu hơn về
              nghiên cứu của chúng tôi.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={TwitterIcon}
            >
              Follow on Twitter
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>

            <SocialLink
              href="mailto:vanhoatruyenthongtruonghoc@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              vanhoatruyenthongtruonghoc@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
