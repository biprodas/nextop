'use client'

import Link from 'next/link'
import { CurrentUser } from '@/types'

import Banner from './banner'

const Navbar = ({ currentUser }: { currentUser: CurrentUser }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-transparent backdrop-blur-2xl transition-all duration-300 ease-in-out">
      {/* <Banner /> */}
      <div className="container mx-auto flex justify-between items-center p-3">
        <div className="text-xl font-bold">WordBook</div>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/ielts">Vocabuilder</Link>
          <Link href="contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
