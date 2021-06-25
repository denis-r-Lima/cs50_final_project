import React from 'react'

import Header from '../../Header'
import SideMenu from '../SideMenu'

import { Container } from '../styles'
import { Content } from './styles'

const SettingsPage: React.FC = () => {
  return (
    <Container>
      <Header />
      <SideMenu />
      <Content>Aqui ira o settings</Content>
    </Container>
  )
}

export default SettingsPage
