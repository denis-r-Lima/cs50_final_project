import React, { useLayoutEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { useHistory } from 'react-router-dom'

import Header from '../../Header'
import SideMenu from '../SideMenu'

import { Container } from '../styles'
import { Button, Content, H1, ItemDiv } from './styles'
import api from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { useIsAuthenticatedContext } from '../../../context/isAuthenticatedContext'

type AccountInfo = {
  page_url: string,
  page_name: string
}

interface ApiResponse extends AxiosResponse {
  data: { account: AccountInfo[] }
}

const MyAccount: React.FC = () => {

  const [ accountData, setAccountData ] = useState<AccountInfo>({page_url: "", page_name: ""})

  const { user } = useIsAuthenticatedContext()

  const history = useHistory()

  async function apiCall() {
    try {
      const response = (await api.get('/accountInfo', {
        params: {
          user_id: user.id
        }
      })) as ApiResponse

      setAccountData(response.data.account[0])
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    apiCall()
  }, [])

  async function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const form = new FormData()
    form.append("userId", String(user.id))
    form.append("pageName", accountData.page_name)
    console.log(accountData)
    try {
      await api.put('/updateAccount', form)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Header />
      <SideMenu />
      <Content>
        <ItemDiv>
          <div>Booking page:</div>
          <div>
            <a href={`/${accountData.page_url}`} target="_blank" rel="noreferrer">Your Booking Page</a>
          </div>
        </ItemDiv>
        <H1 />
        <ItemDiv>
          <div>QR code:</div>
          <div>
            <QRCode value={`http://localhost:3000/${accountData.page_url}`}/>
          </div>
        </ItemDiv>
        <H1 />
        <ItemDiv>
          <div>Business name:</div>
          <div>
            <input type="text" name="name" id="businessName" value={accountData.page_name} 
            onChange={e => setAccountData(current => {return {...current, page_name: e.target.value}})} />
          </div>
        </ItemDiv>
        <Button>
          <button onClick={(e) => handleSave(e)}>Save</button>
        </Button>
      </Content>
    </Container>
  )
}

export default MyAccount
