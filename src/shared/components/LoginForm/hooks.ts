import { useCallback, useState } from 'react'

import { FormFields } from './types'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minPasswordLength = 8

export function useValidateFields() {
  const [errorFields, setErrorFields] = useState<FormFields>({ email: '', password: '' })

  const validateFields = useCallback<(fields: FormFields) => boolean>(({ email, password }) => {
    let valid = true
    const newErrors: FormFields = { email: '', password: '' }

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address'
      valid = false
    }
    if (password.length < minPasswordLength) {
      newErrors.password = 'Password must be at least 8 characters'
      valid = false
    }

    setErrorFields(newErrors)
    return valid
  }, [])

  return { errorFields, validateFields }
}
