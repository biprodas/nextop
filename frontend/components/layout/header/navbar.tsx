'use client'

import { CurrentUser } from '@/types'
import Link from 'next/link'

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
