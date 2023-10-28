import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import toast, { Toaster } from 'react-hot-toast'
import '@/styles/tailwind.css'
import '@/styles/style.css'
import 'react-quill/dist/quill.snow.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

export const metadata: Metadata = {
  title: {
    template: 'Văn hóa truyền thống | THPT Phan Châu Trinh',
    default: 'Văn hóa truyền thống | THPT Phan Châu Trinh',
  },
  description:
    'Băn khoăn tìm mãi bài viết đầu tiên cho chuyên mục “Tự hào là học sinh Phan Châu Trinh”, và rồi chúng mình nhận ra: Có lẽ, ươm mầm tình yêu văn hoá truyền thống nhà trường chính là “viên gạch đầu tiên” đầy vững chắc cho một lòng tự hào nồng nàn về chiếc bảng tên gắn trên ngực trái bộ đồng phục của tất cả chúng ta. ',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
