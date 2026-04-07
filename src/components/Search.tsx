'use client'

import { MagnifyingGlassPlusIcon } from '@heroicons/react/16/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input, InputGroup } from '@/components/ui/input'

interface SearchProps {
  placeholder: string
}

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="flex-1">
      <InputGroup>
        <MagnifyingGlassPlusIcon />
        <Input
          name="search"
          aria-label="Search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </InputGroup>
    </div>
  )
}
