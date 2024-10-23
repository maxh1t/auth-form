import { HomePage } from '@/pages'
import { ThemeProvider } from '@/shared/context/theme'

export function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}
