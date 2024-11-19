import React, { FC, PropsWithChildren, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './styles.css'

type Position = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

type Props = PropsWithChildren & {
  visible: boolean
  onClose: () => void
  position?: Position
  align?: Align
  targetRef: RefObject<HTMLElement>
}

export const Popover: FC<Props> = ({
  children,
  visible,
  onClose,
  position = 'bottom',
  align = 'center',
  targetRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const calculatePosition = () => {
    if (!targetRef.current || !popoverRef.current) return

    const targetRect = targetRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()

    const styles: React.CSSProperties = {}

    switch (position) {
      case 'top':
        styles.top = targetRect.top - popoverRect.height
        break
      case 'bottom':
        styles.top = targetRect.bottom
        break
      case 'left':
        styles.left = targetRect.left - popoverRect.width
        break
      case 'right':
        styles.left = targetRect.right
        break
    }

    switch (align) {
      case 'start':
        if (position === 'top' || position === 'bottom') {
          styles.left = targetRect.left
        } else {
          styles.top = targetRect.top
        }
        break
      case 'center':
        if (position === 'top' || position === 'bottom') {
          styles.left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2
        } else {
          styles.top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2
        }
        break
      case 'end':
        if (position === 'top' || position === 'bottom') {
          styles.left = targetRect.right - popoverRect.width
        } else {
          styles.top = targetRect.bottom - popoverRect.height
        }
        break
    }

    setStyle(styles)
  }
  const handleCloseClick = (e: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target as Node) &&
      targetRef.current &&
      !targetRef.current.contains(e.target as Node)
    ) {
      onClose()
    }
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleCloseClick)
    } else {
      document.removeEventListener('mousedown', handleCloseClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleCloseClick)
    }
  }, [visible])

  useLayoutEffect(() => {
    if (visible) {
      calculatePosition()
    }
  }, [visible, position, align])

  if (!visible) return null

  return (
    <div className='popover' style={style} ref={popoverRef} role='tooltip'>
      {children}
    </div>
  )
}
