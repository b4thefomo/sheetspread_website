import './globals.css'
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: 'SailsMaps Blog',
  description: 'Construction Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
} 