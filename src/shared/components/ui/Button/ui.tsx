import { ButtonHTMLAttributes } from 'react'

import { Loading } from '@/shared/components/ui/Loading'
import { parseClassNames } from '@/shared/lib/parseClassNames'
import './styles.css'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export function Button({ disabled, loading, children, ...props }: Props) {
  return (
    <button
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
}
