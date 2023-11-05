import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import '@/styles/tailwind.css'
import '@/styles/style.css'
import 'react-quill/dist/quill.snow.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import CookieBanner from '@/components/cookiebanner'

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
      <GoogleAnalytics GA_MEASUREMENT_ID="G-QG738YM2RG" />
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QG738YM2RG"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >{`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QG738YM2RG');`}</Script> */}
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex w-full">
            <Layout>{children}</Layout>
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  )
}
