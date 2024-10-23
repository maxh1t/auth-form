import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/shared/constants'

type Credential = { title: string; value: string }

export const CREDENTIALS: Credential[] = [
  { title: 'Email:', value: ADMIN_EMAIL },
  { title: 'Password:', value: ADMIN_PASSWORD },
]
