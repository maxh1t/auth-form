import { FormEvent, useEffect, useRef, useState } from 'react'

import { useValidateFields } from './hooks'
import { FormFields } from './types'

import { EyeClosedIcon } from '@/assets/icons/EyeClosedIcon'
import { EyeOpenIcon } from '@/assets/icons/EyeOpenIcon'
import { login } from '@/shared/api'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Input } from '@/shared/components/Input'
import { accessTokenStore } from '@/shared/lib/stores'

import './styles.css'

type Props = {
  onLogin?: () => void
}

export function LoginForm({ onLogin }: Props) {
  const [fields, setFields] = useState<FormFields>({ email: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  const { validateFields, errorFields } = useValidateFields()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateFields(fields)) return

    setLoading(true)

    try {
      const response = await login(fields)
      accessTokenStore.set(response.accessToken)

      onLogin?.()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  return (
    <Card className='login-form' title='Login'>
      <form className='login-form__content' onSubmit={handleSubmit}>
        <Input
          ref={emailInputRef}
          id='email'
          label='Email'
          value={fields.email}
          onChange={(e) => setFields((prevState) => ({ ...prevState, email: e.target.value }))}
          type='email'
          error={errorFields.email}
          aria-label='Email'
          disabled={loading}
        />

        <Input
          id='password'
          label='Password'
          value={fields.password}
          onChange={(e) => setFields((prevState) => ({ ...prevState, password: e.target.value }))}
          type={passwordVisible ? 'text' : 'password'}
          error={errorFields.password}
          aria-label='Password'
          disabled={loading}
          iconButtonProps={{
            onClick: () => setPasswordVisible((prevState) => !prevState),
            children: passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />,
          }}
        />

        {error && (
          <p className='login-form__error' role='alert'>
            {error}
          </p>
        )}

        <Button type='submit' className='login-form__button' loading={loading}>
          Submit
        </Button>
      </form>
    </Card>
  )
}
