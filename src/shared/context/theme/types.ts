import { Theme } from './constants'

export type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}
