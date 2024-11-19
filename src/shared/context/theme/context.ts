import { createContext, useContext } from 'react'

import { Theme } from './constants'
import { ThemeContextState } from './types'

export const ThemeContext = createContext<ThemeContextState>({
  theme: Theme.System,
  setTheme: () => null,
})

export const useThemeContext = () => useContext(ThemeContext)
