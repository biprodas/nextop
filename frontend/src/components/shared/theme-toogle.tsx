'use client'

import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  console.log(theme)

  return (
    <Button variant="ghost" size="3" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <SunIcon
        width="16"
        height="16"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        width="16"
        height="16"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
