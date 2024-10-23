import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/shared/constants'

export type LoginData = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export async function login(data: LoginData): Promise<LoginResponse> {
  console.log('API Request - Login', data)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { email, password } = data

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw new Error('Invalid email or password')
  }

  return { accessToken: 'some_access_token' }
}
