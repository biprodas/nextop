import React from 'react'
import dayjs from 'dayjs'
import { Link } from '@radix-ui/themes'
import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="border">
      <div className="container mx-auto flex justify-between items-center py-3">
        <small>
          <Link href="/">WordBook</Link>
          <span className="ms-1">&copy; {dayjs().format('YYYY')} all right reserved</span>
        </small>
        <small>
          <span className="mr-1">Developed with ♥ by</span>
          <Link href={siteConfig.links.linkedIn} target="_blank">
            biprodas.ry
          </Link>
        </small>
      </div>
    </footer>
  )
}
