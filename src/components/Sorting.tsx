'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select } from '@/components/ui/select'

interface SortingProps {
  values: string[]
  variant: string
}

const Sorting = ({ values, variant }: SortingProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value
    const params = new URLSearchParams(searchParams)

    params.set('sort', sortValue)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {variant === 'departments' ? (
        <div className="min-h-[44px]">
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option
                key={index + value}
                value={value === 'budget ↓' ? 'budgetDesc' : value === 'budget ↑' ? 'budgetAsc' : value}
                className=""
              >
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      ) : variant === 'departmentEmployees' ? (
        <div className="min-h-[44px]">
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option
                key={index + value}
                value={value === 'salary ↓' ? 'salaryDesc' : value === 'salary ↑' ? 'salaryAsc' : value}
                className=""
              >
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      ) : (
        <div className="min-h-[44px]">
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option key={index + value} value={value} className="">
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      )}
    </>
  )
}

export default Sorting
