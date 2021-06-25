import React from 'react'

import Header from '../../Header'
import SideMenu from '../SideMenu'

import { Container } from '../styles'
import { Content } from '../SettingsPage/styles'

const MyAccount: React.FC = () => {
  return (
    <Container>
      <Header />
      <SideMenu />
      <Content>Aqui ira o my account</Content>
    </Container>
  )
}

export default MyAccount
