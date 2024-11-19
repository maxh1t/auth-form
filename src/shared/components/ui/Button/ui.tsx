import { ButtonHTMLAttributes, forwardRef } from 'react'

import { Loading } from '@/shared/components/ui/Loading'
import { parseClassNames } from '@/shared/lib/parseClassNames'
import './styles.css'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { disabled, loading, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type='button'
      {...props}
      disabled={disabled || loading}
      aria-busy={disabled || loading}
      aria-disabled={disabled || loading}
      className={parseClassNames('button', props.className)}
    >
      {loading ? <Loading /> : children}
    </button>
  )
})
