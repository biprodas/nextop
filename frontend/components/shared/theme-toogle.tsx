'use client'

import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="2">
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
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2">
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          <SunIcon width="16" height="16" /> Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          <MoonIcon width="16" height="16" /> Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          <LaptopIcon width="16" height="16" /> System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
