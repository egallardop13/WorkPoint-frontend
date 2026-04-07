'use client'
import { formatCurrency } from '@/lib/utils'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { LineChart } from '@mui/x-charts/LineChart'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

const colorMap = {
  light: {
    'total-budget': 'hsl(215, 15%, 75%)',
    'total-active-budget': 'hsl(144, 72%, 41%)',
    'total-inactive-budget': 'hsl(355, 98%, 66%)',
  },
  dark: {
    'total-budget': 'hsl(215, 15%, 40%)',
    'total-active-budget': 'hsl(144, 72%, 37%)',
    'total-inactive-budget': 'hsl(355, 98%, 39%)',
  },
}

function getAllMonths() {
  const months = []

  for (let month = 0; month < 12; month++) {
    const date = new Date(2023, month)
    const monthName = date.toLocaleDateString('en-US', {
      month: 'short',
    })
    months.push(monthName)
  }

  return months
}

function formatData(data: BudgetData, variant: string, isDarkMode: boolean) {
  const result: { id: string; label: string; showMark: boolean; curve: 'linear'; color: string; data: number[] }[] = []

  const colors = isDarkMode ? colorMap.dark : colorMap.light

  if (variant !== 'activeVsInactive' && data['totalBudget']) {
    result.push({
      id: 'total-budget',
      label: 'Total Employee Budget',
      showMark: false,
      curve: 'linear',
      color: colors['total-budget'],
      data: data['totalBudget'],
    })
  }

  if (data['totalActiveBudget']) {
    result.push({
      id: 'total-active-budget',
      label: 'Total Active Employee Budget',
      showMark: false,
      curve: 'linear',
      color: colors['total-active-budget'],
      data: data['totalActiveBudget'],
    })
  }
  if (data['totalInactiveBudget']) {
    result.push({
      id: 'total-inactive-budget',
      label: 'Total Inactive Employee Budget',
      showMark: false,
      curve: 'linear',
      color: colors['total-inactive-budget'],
      data: data['totalInactiveBudget'],
    })
  }

  return result
}

function calculateGrowthRate(budget: number[]) {
  const currentBudget = budget[budget.length - 1] // Current month
  const previousBudget = budget[0] // Starting month

  let trend = ''

  if (currentBudget > previousBudget) {
    trend = 'up'
  } else if (currentBudget < previousBudget) {
    trend = 'down'
  } else {
    trend = 'neutral'
  }

  let growthRate: number | string = 0

  // Prevent division by zero
  if (previousBudget !== 0) {
    const tempRate = ((currentBudget - previousBudget) / previousBudget) * 100
    growthRate = `${tempRate > 0 ? '+' : '-'}${tempRate.toFixed(2)}%`
  }

  const result = { trend, growthRate }

  return result
}

// Returns budget of the last month
function calculateBudgetSum(budget: number[]) {
  const budgetSum = budget[budget.length - 1]

  const result = formatCurrency(budgetSum)

  return result
}

const getMinYValue = (budgetData: BudgetData, variant: string) => {
  let result = 0

  switch (variant) {
    case 'activeVsInactive':
      result = Math.floor(Math.min(...(budgetData['totalActiveBudget'] ?? []), ...(budgetData['totalInactiveBudget'] ?? [])))
      break
    case 'totalVsActive':
      result = Math.floor(Math.min(...(budgetData['totalBudget'] ?? []), ...(budgetData['totalActiveBudget'] ?? [])))
      break
    case 'totalVsInactive':
      result = Math.floor(Math.min(...(budgetData['totalBudget'] ?? []), ...(budgetData['totalInactiveBudget'] ?? [])))
      break
  }

  return result
}

/* 
Budgets is expecting to recieve 3 properties:
  totalBudget,
  totalActiveBudget,
  totalInactiveBudget,

  All three of these are an array of numbers
*/
interface BudgetData {
  totalBudget?: number[]
  totalActiveBudget?: number[]
  totalInactiveBudget?: number[]
}

interface BudgetLineChartProps {
  budgets: BudgetData
  heading: string
  description: string
  variant: string
  metricType: string
}

export default function BudgetLineChart({ budgets, heading, description, variant, metricType }: BudgetLineChartProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const budgetData = useMemo(() => formatData(budgets, variant, isDarkMode), [budgets, variant, isDarkMode])

  const { trend, growthRate } = useMemo(() => {
    const key =
      variant === 'activeVsInactive'
        ? 'totalBudget'
        : variant === 'totalVsActive'
          ? 'totalActiveBudget'
          : 'totalInactiveBudget'
    return calculateGrowthRate(budgets[key] ?? [])
  }, [budgets, variant])

  let isPositiveTrend
  if (metricType === 'neutral') isPositiveTrend = null
  else isPositiveTrend = (metricType === 'good' && trend === 'up') || (metricType === 'bad' && trend === 'down')

  const budgetSum = useMemo(() => {
    const key =
      variant === 'activeVsInactive'
        ? 'totalBudget'
        : variant === 'totalVsActive'
          ? 'totalActiveBudget'
          : 'totalInactiveBudget'
    return calculateBudgetSum(budgets[key] ?? [])
  }, [budgets, variant])

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          background: {
            default: isDarkMode ? '#18181b' : '#ffffff',
            paper: isDarkMode ? '#18181b' : '#ffffff',
          },
          text: {
            primary: isDarkMode ? '#d1d5db' : '#374151',
            secondary: isDarkMode ? 'hsl(215, 15%, 75%)' : 'hsl(220, 20%, 35%)',
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                backgroundColor: isDarkMode ? '#18181b !important' : '#f3f4f6',
                color: isDarkMode ? '#d1d5db' : '#374151',
              },
            },
          },
          MuiChart: {
            styleOverrides: {
              root: {
                backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5',
                '& .MuiChart-tickLabel': {
                  fill: isDarkMode ? '#9ca3af' : '#4b5563',
                },
                '& .MuiChart-axisLabel': {
                  fill: isDarkMode ? '#d1d5db' : '#374151',
                },
                '& .MuiChartsLegend-series text': {
                  fill: isDarkMode ? '#d1d5db' : '#374151',
                },
              },
            },
          },
        },
      }),
    [isDarkMode]
  )

  const data = useMemo(() => getAllMonths(), [])
  const colorPalette = [muiTheme.palette.primary.light, muiTheme.palette.primary.main, muiTheme.palette.primary.dark]

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          border: '0',
          borderRadius: '0.5rem',
          borderColor: isDarkMode ? 'rgb(255 255 255 / 0.1)' : 'rgb(9 9 11 / 0.05)',
        }}
      >
        <CardContent sx={{}}>
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            sx={{
              color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)',
            }}
          >
            {heading}
          </Typography>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{
                alignContent: { xs: 'center', sm: 'flex-start' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)',
                }}
              >
                {budgetSum}
              </Typography>
              <Chip
                size="small"
                color="error"
                label={growthRate}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  border: '1px solid',
                  fontSize: '0.75rem',
                  borderRadius: '999px',
                  borderColor:
                    metricType === 'neutral'
                      ? isDarkMode
                        ? 'rgb(51, 60, 77)'
                        : ' rgb(218, 222, 231)'
                      : isPositiveTrend
                        ? isDarkMode
                          ? 'hsl(120, 84%, 10%)'
                          : 'hsl(120, 75%, 87%)'
                        : isDarkMode
                          ? 'hsl(0, 95%, 12%)'
                          : 'hsl(0, 92%, 90%)',
                  backgroundColor:
                    metricType === 'neutral'
                      ? isDarkMode
                        ? 'rgb(11, 14, 20)'
                        : 'rgb(235, 238, 244)'
                      : isPositiveTrend
                        ? isDarkMode
                          ? 'hsl(120, 87%, 6%)'
                          : 'hsl(120, 80%, 98%)'
                        : isDarkMode
                          ? 'hsl(0, 93%, 6%)'
                          : 'hsl(0, 100%, 97%)',
                  color:
                    metricType === 'neutral'
                      ? isDarkMode
                        ? 'rgb(194, 201, 214)'
                        : 'rgb(86, 100, 129)'
                      : isPositiveTrend
                        ? isDarkMode
                          ? 'hsl(120, 61%, 77%)'
                          : 'hsl(120, 59%, 30%)'
                        : isDarkMode
                          ? 'hsl(0, 94%, 80%)'
                          : 'hsl(0, 59%, 30%)',
                  fontWeight: 600,
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Stack>
          <LineChart
            colors={colorPalette}
            xAxis={[
              {
                scaleType: 'point',
                data,
                tickInterval: (index, i) => (i + 1) % 2 === 0,
              },
            ]}
            series={budgetData}
            height={250}
            margin={{
              left: 77,
              right: 20,
              top: 20,
              bottom: 20,
            }}
            grid={{ horizontal: true }}
            sx={{
              '& .MuiAreaElement-series-total-inactive-budget': {
                fill: "url('#total-inactive-budget')",
              },
              '& .MuiAreaElement-series-total-active-budget': {
                fill: "url('#total-active-budget')",
              },
              '& .MuiAreaElement-series-total-budget': {
                fill: "url('#total-budget')",
              },
            }}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
          ></LineChart>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
