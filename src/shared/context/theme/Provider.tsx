import { PropsWithChildren, useState } from 'react'

import { Theme } from './constants'
import { ThemeContext } from './context'
import { getDefaultTheme, applyThemeClass } from './lib'

import { themeStore } from '@/shared/lib/stores'

export function Provider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(getDefaultTheme())

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light
    setTheme(newTheme)
    applyThemeClass(newTheme)
    themeStore.set(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
