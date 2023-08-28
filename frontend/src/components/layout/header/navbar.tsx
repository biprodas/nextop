'use client'

import Link from 'next/link'
import { CurrentUser } from '@/types'
import Banner from './banner'

const Navbar = ({ currentUser }: { currentUser: CurrentUser }) => {
  return (
    <nav className="space-x-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/ielts">Vocabuilder</Link>
      <Link href="contact">Contact</Link>
    </nav>
  )
}

export default Navbar
