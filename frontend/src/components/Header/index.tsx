import React from 'react'
import { FcCalendar } from 'react-icons/fc'
import { Link } from 'react-router-dom'

import { Container, Logo } from './styles'

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <FcCalendar size="3rem" />
        <Logo>AppointmentBooker.com</Logo>
      </Link>
    </Container>
  )
}

export default Header
