'use client'

import { Button } from '@radix-ui/themes'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error: ', error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-160px)] w-full flex-col items-center justify-center gap-y-4">
      <h2 className=" text-5xl font-bold text-destructive">Oops, Something Went Wrong!</h2>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  )
}
