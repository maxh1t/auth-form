import { Theme, DARK_THEME_CLASS } from './constants'

import { themeStore } from '@/shared/lib/stores'

export function getDefaultTheme(): Theme {
  const storedTheme = themeStore.get() as Theme

  if (storedTheme) {
    applyThemeClass(storedTheme)
    return storedTheme
  }

  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
  applyThemeClass(preferredTheme)

  return preferredTheme
}

export function applyThemeClass(theme: Theme) {
  if (theme === Theme.Dark) {
    document.body.classList.add(DARK_THEME_CLASS)
  } else {
    document.body.classList.remove(DARK_THEME_CLASS)
  }
}
