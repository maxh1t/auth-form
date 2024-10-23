import { useState } from 'react'

import { LoginForm } from '@/shared/components/LoginForm'
import { Settings } from '@/shared/components/Settings'
import { UserCard } from '@/shared/components/UserCard'
import { accessTokenStore } from '@/shared/lib/stores'

import './styles.css'

export function HomePage() {
  const [login, setLogin] = useState<boolean>(!!accessTokenStore.get())

  return (
    <div className='home-page'>
      <div className='home-page__content'>
        {login ? <UserCard onLogout={() => setLogin(false)} /> : <LoginForm onLogin={() => setLogin(true)} />}

        <Settings />
      </div>
    </div>
  )
}
