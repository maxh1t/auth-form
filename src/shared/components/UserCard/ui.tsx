import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { accessTokenStore } from '@/shared/lib/stores'
import './styles.css'

type Props = {
  onLogout?: () => void
}

export function UserCard({ onLogout }: Props) {
  const handleLogoutClick = () => {
    accessTokenStore.remove()
    onLogout?.()
  }

  return (
    <Card className='user-card' title='Login Successfully'>
      <img
        className='user-card__image'
        src='/images/login-successfully.jpeg'
        alt='Login Successfully'
        loading='lazy'
        decoding='async'
        width='736'
        height='414'
      />

      <Button className='user-card__logout' onClick={handleLogoutClick}>
        Logout
      </Button>
    </Card>
  )
}
