import { createContext, useContext } from 'react'

import { ThemeContextType } from './types'

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => useContext(ThemeContext)
