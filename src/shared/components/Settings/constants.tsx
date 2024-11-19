import { ReactNode } from 'react'

import { MoonIcon } from '@/assets/icons/MoonIcon'
import { SunIcon } from '@/assets/icons/SunIcon'
import { SunMoonIcon } from '@/assets/icons/SunMoonIcon'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/shared/constants'
import { Theme } from '@/shared/context/theme'

type Credential = { title: string; value: string }

export const CREDENTIALS: Credential[] = [
  { title: 'Email', value: ADMIN_EMAIL },
  { title: 'Password', value: ADMIN_PASSWORD },
]

type ThemeOption = {
  theme: Theme
  label: string
  icon: ReactNode
}

export const THEME_OPTIONS: ThemeOption[] = [
  { theme: Theme.Light, label: 'Light', icon: <SunIcon /> },
  { theme: Theme.Dark, label: 'Dark', icon: <MoonIcon /> },
  { theme: Theme.System, label: 'System', icon: <SunMoonIcon /> },
]
