import React from 'react'
import Navbar from './navbar'

const Header = () => {
  const currentUser = {
    id: '1',
    name: 'Biprodas Roy',
    username: 'biprodas',
    email: 'email',
    shortBio: 'Sr. Software Engineer',
    image: '',
  }
  return (
    <header className="sticky top-0 z-30 w-full border-b dark:border-slate-700 bg-slate-50/60 backdrop-blur-2xl transition-all duration-300 dark:bg-slate-800">
      {/* <Banner /> */}
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="text-xl font-bold">WordBook</div>
        <Navbar currentUser={currentUser} />
      </div>
    </header>
  )
}

export default Header
