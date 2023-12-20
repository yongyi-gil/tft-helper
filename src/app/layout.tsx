"use client";
import React from 'react';
import { RecoilRoot } from 'recoil';

import StyledComponentsRegistry from '../lib/registry';

import './globals.css';

import Header from '@/component/header/Header';
import Toolbar from '@/component/toolbar/Toolbar';

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
            <React.Suspense fallback={<div />}>
              <Header />
              <div className="banner">
                <div className="banner-overlay" />
              </div>
              <Toolbar />
              {children}
            </React.Suspense>
          </StyledComponentsRegistry>
        </RecoilRoot>
      </body>
    </html>
  )
}
