"use client"
import { RecoilRoot } from 'recoil';

import StyledComponentsRegistry from '../lib/registry';

import './globals.css';

import Header from '@/component/header/Header';
import Toolbar from '@/component/toolbar/Toobar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <StyledComponentsRegistry>
            <Header />
            <div className="banner">
              <div className="banner-overlay" />
            </div>
            <Toolbar />
            {children}
          </StyledComponentsRegistry>
        </RecoilRoot>
      </body>
    </html>
  )
}
