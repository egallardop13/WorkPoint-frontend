'use client'

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { useTheme } from 'next-themes'

const ActiveUsersPieChart = () => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const activeUsers = 176
  const totalUsers = 200

  const data = [
    { label: 'Group A', value: 800, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
  ]

  const sizing = {
    margin: { right: 5 },

    legend: { hidden: true },
  }
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0)

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL
    return params.value === 800 ? `Active` : `Inactive`
  }

  return (
    <div className="h-full max-h-24 w-full max-w-32">
      {/* Mini pie chart representing active vs inactive users */}
      <PieChart
        series={[
          {
            outerRadius: 41,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 11,
          },
        }}
        {...sizing}
      />
    </div>
  )
}

export default ActiveUsersPieChart
