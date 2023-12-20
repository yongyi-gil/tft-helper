import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <Link
        href="/"
      >
        <h1>TFT Season.10 Helper</h1>
      </Link>
    </div>
  )
}
