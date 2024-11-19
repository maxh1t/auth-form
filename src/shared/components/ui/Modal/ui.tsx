import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { MODAL_ROOT_CLASS } from './constants'
import { createModalRoot } from './lib'

import { parseClassNames } from '@/shared/lib/parseClassNames'
import './styles.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  ariaLabel?: string
}

export function Modal({ isOpen, onClose, children, ariaLabel = 'Modal Window' }: Props) {
  const modalRoot = document.getElementById(MODAL_ROOT_CLASS) || createModalRoot()
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isVisible) return null

  return createPortal(
    <div
      className={parseClassNames('modal', isOpen ? 'modal--open' : 'modal--close')}
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={ariaLabel}
    >
      <div
        className={parseClassNames('modal__content', isOpen ? 'modal__content--open' : 'modal__content--close')}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
