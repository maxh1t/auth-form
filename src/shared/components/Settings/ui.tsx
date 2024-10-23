import { useState } from 'react'

import { ClipboardCopyIcon } from '@/assets/icons/ClipboardCopyIcon'
import { MoonIcon } from '@/assets/icons/MoonIcon'
import { PersonIcon } from '@/assets/icons/PersonIcon'
import { SunIcon } from '@/assets/icons/SunIcon'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Modal } from '@/shared/components/Modal'
import { CREDENTIALS } from '@/shared/components/Settings/constants'
import { Theme, useThemeContext } from '@/shared/context/theme'
import './styles.css'

export function Settings() {
  const themeContext = useThemeContext()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleCopyClick = async (text: string) => {
    await navigator.clipboard.writeText(text)

    setOpenModal(false)
  }

  return (
    <div className='settings'>
      <Button className='settings__toggle-theme' onClick={themeContext?.toggleTheme} aria-label='Toggle Theme Button'>
        {themeContext?.theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Button
        className='settings__open-credential-modal'
        aria-label='Open Credential Modal'
        onClick={() => setOpenModal(true)}
      >
        <PersonIcon />
      </Button>

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
