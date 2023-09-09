'use client'
import Link from 'next/link'
import { CurrentUser } from '@/types'
import ThemeToggle from '@/components/shared/theme-toogle'

const Navbar = ({ currentUser }: { currentUser: CurrentUser }) => {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/ielts">Vocabuilder</Link>
      <Link href="/contact">Contact</Link>
      <ThemeToggle />
    </nav>
  )
}

export default Navbar
