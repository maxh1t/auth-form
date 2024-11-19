import { useRef, useState } from 'react'

import { ClipboardCopyIcon } from '@/assets/icons/ClipboardCopyIcon'
import { MoonIcon } from '@/assets/icons/MoonIcon'
import { PersonIcon } from '@/assets/icons/PersonIcon'
import { SunIcon } from '@/assets/icons/SunIcon'
import { SunMoonIcon } from '@/assets/icons/SunMoonIcon'
import { CREDENTIALS, THEME_OPTIONS } from '@/shared/components/Settings/constants'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Modal } from '@/shared/components/ui/Modal'
import { Popover } from '@/shared/components/ui/Popover'
import { Theme, useThemeContext } from '@/shared/context/theme'
import './styles.css'

export function Settings() {
  const { theme, setTheme } = useThemeContext()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleCopyClick = async (text: string) => {
    await navigator.clipboard.writeText(text)

    setOpenModal(false)
  }

  const handleThemeClick = (theme: Theme) => {
    setTheme(theme)
    setPopoverVisible(false)
  }

  return (
    <div className='settings'>
      <Button
        className='settings__toggle-theme'
        onClick={() => setPopoverVisible((prevState) => !prevState)}
        ref={buttonRef}
        aria-label='Toggle Theme Button'
      >
        {theme === Theme.Light && <SunIcon />}
        {theme === Theme.Dark && <MoonIcon />}
        {theme === Theme.System && <SunMoonIcon />}
      </Button>

      <Button
        className='settings__open-credential-modal'
        aria-label='Open Credential Modal'
        onClick={() => setOpenModal(true)}
      >
        <PersonIcon />
      </Button>

      <Popover
        targetRef={buttonRef}
        visible={popoverVisible}
        onClose={() => setPopoverVisible(false)}
        align='start'
        position='bottom'
      >
        <div className='settings__theme-picker'>
          {THEME_OPTIONS.map(({ theme: t, label, icon }) => (
            <Button
              key={t}
              className={`settings__theme-button ${t === theme ? 'settings__theme-button--active' : ''}`}
              onClick={() => handleThemeClick(t)}
              aria-label={label}
            >
              {icon}
              {label}
            </Button>
          ))}
        </div>
      </Popover>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} ariaLabel='Credentials Modal'>
        <Card title='Credentials'>
          <div className='settings__credentials'>
            {CREDENTIALS.map(({ title, value }) => (
              <div key={title} className='settings__credential'>
                <div className='settings__credential__title'>{title}:</div>

                <div className='settings__credential__value'>{value}</div>

                <div className='settings__credential__actions'>
                  <Button
                    className='settings__copy-button'
                    onClick={() => handleCopyClick(value)}
                    aria-label={`Copy ${title} to clipboard`}
                  >
                    <ClipboardCopyIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Modal>
    </div>
  )
}
