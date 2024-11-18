import { InputHTMLAttributes, forwardRef } from 'react'

import { Button, ButtonProps } from '@/shared/components/Button'
import { parseClassNames } from '@/shared/lib/parseClassNames'
import './styles.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: string
  iconButtonProps?: ButtonProps
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { id, label, iconButtonProps, error, ...props },
  ref,
) {
  return (
    <div className='input'>
      <label htmlFor={id} className='input__label'>
        {label}
      </label>
      <div className={parseClassNames('input__wrapper', error && 'input__wrapper--error')}>
        <input
          {...props}
          id={id}
          ref={ref}
          className={parseClassNames('input__field', iconButtonProps && 'input__field--icon', props.className)}
          aria-invalid={!!error}
        />

        {iconButtonProps && (
          <Button {...iconButtonProps} className={parseClassNames('input__icon-button', iconButtonProps.className)} />
        )}
      </div>
      {error && <p className='input__error'>{error}</p>}
    </div>
  )
})
