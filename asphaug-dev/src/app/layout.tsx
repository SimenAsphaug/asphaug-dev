// RootLayout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Asphaug',
  description: 'Asphaug.dev',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/me.jpg" />
        <meta name="theme-color" content="#0e1117" />
      </head>
      <body className="flex flex-col min-h-screen bg-[#0e1117] text-[#d1d5db] font-sans antialiased">
        <Navbar />
        {/* This main container grows to fill remaining space */}
        <main className="flex-1">
          {children}
        </main>
        {/* Footer stays at the bottom */}
        <footer className="w-full bg-[#0e1117] text-center py-5 text-sm text-slate-500">
          &copy; 2025 - {new Date().getFullYear()} Simen Asphaug.
        </footer>
      </body>
    </html>
  )
}
