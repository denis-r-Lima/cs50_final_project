import React from 'react'
import { FcCalendar } from 'react-icons/fc'
import { Link, useHistory } from 'react-router-dom'

import { useIsAuthenticatedContext } from '../../context/isAuthenticatedContext'
import api from '../../utils/api'

import { Container, Logo, LogOut } from './styles'

type UserType = {
  id: number
  name: string
}

const Header: React.FC = () => {
  const { user, toggleIsAuthenticated, setUser } = useIsAuthenticatedContext()


  const history = useHistory()

  const handleLogout = async () => {
    toggleIsAuthenticated()
    setUser({} as UserType)
    try {
      await api.get('/logout')
      
    } catch (error) {
      console.log(error)
    }
    
    history.push('/login')
  }
  return (
    <Container>
      <Link to="/">
        <FcCalendar size="3rem" />
        <Logo>AppointmentBooker.com</Logo>
      </Link>
      {user.name && (
        <LogOut>
          <h4>Welcome {user.name}!</h4>
          <h4 onClick={() => handleLogout()}>Logout</h4>
        </LogOut>
      )}
    </Container>
  )
}

export default Header
