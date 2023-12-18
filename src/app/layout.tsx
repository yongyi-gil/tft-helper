"use client"
import { RecoilRoot } from 'recoil';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <div className="header">
            <h1>TFT Season.10 Helper</h1>
          </div>
          <div className="banner">
            <div className="banner-overlay" />
          </div>
          {children}
        </RecoilRoot>
      </body>
    </html>
  )
}
