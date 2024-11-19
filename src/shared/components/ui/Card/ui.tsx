import { ButtonHTMLAttributes, ReactNode } from 'react'

import { parseClassNames } from '@/shared/lib/parseClassNames'
import './styles.css'

type Props = ButtonHTMLAttributes<HTMLDivElement> & {
  title?: ReactNode
}

export function Card({ title, children, ...props }: Props) {
  return (
    <div {...props} className={parseClassNames('card', props.className)}>
      {title && <h2 className='card__title'>{title}</h2>}
      {children}
    </div>
  )
}
