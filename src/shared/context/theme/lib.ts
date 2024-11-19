import { Theme, DARK_THEME_CLASS } from './constants'

import { themeStore } from '@/shared/lib/stores'

export function getDefaultTheme(): Theme {
  const theme = (themeStore.get() as Theme) || Theme.System

  updateTheme(theme)
  return theme
}

export function updateTheme(theme: Theme) {
  let resolveTheme = theme
  if (theme === Theme.System) {
    resolveTheme = getSystemTheme()
  }

  themeStore.set(theme)

  window.document.documentElement.classList.toggle(DARK_THEME_CLASS, resolveTheme === Theme.Dark)
}

export function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
}
