import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Components {
    MuiChart?: {
      styleOverrides?: {
        root?: Record<string, unknown>
      }
    }
    MuiDataGrid?: {
      styleOverrides?: Record<string, unknown>
    }
  }
}
