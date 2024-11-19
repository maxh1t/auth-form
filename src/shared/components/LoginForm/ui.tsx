import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import { useValidateFields } from './hooks'
import { FormFields } from './types'

import { EyeClosedIcon } from '@/assets/icons/EyeClosedIcon'
import { EyeOpenIcon } from '@/assets/icons/EyeOpenIcon'
import { login } from '@/shared/api'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Input } from '@/shared/components/ui/Input'
import { accessTokenStore } from '@/shared/lib/stores'

import './styles.css'

type Props = {
  onLogin?: () => void
}

export function LoginForm({ onLogin }: Props) {
  const [fields, setFields] = useState<FormFields>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  const { validateFields, errorFields } = useValidateFields()

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFields((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError('')

      if (!validateFields(fields)) return

      setLoading(true)

      try {
        const response = await login(fields)
        accessTokenStore.set(response.accessToken)

        onLogin?.()
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setLoading(false)
      }
    },
    [fields, onLogin, validateFields],
  )

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  return (
    <Card className='login-form' title='Login'>
      <form className='login-form__content' onSubmit={handleSubmit} noValidate>
        <Input
          ref={emailInputRef}
          id='email'
          name='email'
          type='email'
          label='Email'
          autoComplete='username'
          value={fields.email}
          onChange={handleInputChange}
          error={errorFields.email}
          disabled={loading}
          required
        />

        <Input
          id='password'
          name='password'
          label='Password'
          autoComplete='current-password'
          type={passwordVisible ? 'text' : 'password'}
          value={fields.password}
          onChange={handleInputChange}
          error={errorFields.password}
          disabled={loading}
          iconButtonProps={{
            onClick: () => setPasswordVisible((prevState) => !prevState),
            children: passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />,
            'aria-label': passwordVisible ? 'Hide password' : 'Show password',
          }}
          required
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
