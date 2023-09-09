import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (word: string) => void
  setWord: (word: string) => void
  word: string
}

function SearchBar({ onSearch, setWord, word }: SearchBarProps): JSX.Element {
  const handleSearch = (): void => {
    onSearch(word)
  }

  return (
    <div className="flex items-center gap-3">
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Search the docs…"
          size={'3'}
          value={word}
          className="focus:outline-none"
          onChange={(e) => setWord(e.target.value)}
        />
      </TextField.Root>
      {word && (
        <Button variant="soft" onClick={handleSearch}>
          Search
        </Button>
      )}
    </div>
  )
}

export default SearchBar
