import React from 'react'
import Navbar from './navbar'
import Banner from './banner'

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
    <header className="border border-b-violet-300">
      <Banner />
      <section className="container mx-auto flex justify-between items-center py-3">
        <div className="text-xl font-bold">WordBook</div>
        <Navbar currentUser={currentUser} />
      </section>
    </header>
  )
}

export default Header
