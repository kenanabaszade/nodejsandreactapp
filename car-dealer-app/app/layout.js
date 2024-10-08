// app/layout.js

import React, { Suspense } from 'react';
import { Inter } from 'next/font/google';
import '../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div className="loader">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
