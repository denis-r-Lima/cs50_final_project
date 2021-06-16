import React, { useRef, useEffect, useState } from 'react'
import QRCode from 'qrcode.react'

import api from '../../utils/api'
import scheduleDate from '../../utils/scheduleDate'
import { useIsAuthenticatedContext } from '../../context/isAuthenticatedContext'

import Header from '../Header'
import UserAppointment from '../UserAppointment'

import { BurgerBar, BurgerMenu, Container, LogOut, Menu } from './styles'
import { useHistory } from 'react-router-dom'
import { AxiosResponse } from 'axios'

type ScheduleProps = {
  phone: string
  client: string
  date: string
}

interface ApiResponse extends AxiosResponse {
  data: { schedule: ScheduleProps[] }
}

type UserType = {
  id: number
  name: string
  page_name: string
}

const UserPage: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleProps[]>([])
  const [schedulePlusDate, setSchedulePlusDate] = useState<number>(0)

  const { user, toggleIsAuthenticated, setUser } = useIsAuthenticatedContext()

  const id = user.id

  const date = scheduleDate(schedulePlusDate)

  const menuDiv = useRef<HTMLDivElement>(null)

  const history = useHistory()

  const onBurgerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.contains('opened')
      ? e.currentTarget.classList.remove('opened')
      : e.currentTarget.classList.add('opened')

    menuDiv.current?.classList.contains('show')
      ? menuDiv.current?.classList.remove('show')
      : menuDiv.current?.classList.add('show')
  }

  const handleLogout = () => {
    toggleIsAuthenticated()
    setUser({} as UserType)
    document.cookie = 'auth_token=;'
    history.push('/login')
  }

  async function apiCall() {
    try {
      const response = (await api.get('/schedule', {params: {
        user_id: id
      }})) as ApiResponse
      setSchedule(response.data.schedule)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {

    apiCall()
  }, [])

  return (
    <Container>
      <Header />
      <LogOut>
        <h4>Welcome {user.name}!</h4>
        <h4 onClick={() => handleLogout()}>Logout</h4>
      </LogOut>
      <BurgerMenu onClick={e => onBurgerClick(e)}>
        <BurgerBar />
        <BurgerBar />
        <BurgerBar />
      </BurgerMenu>
      <Menu ref={menuDiv}>
        <a
          href={`http://localhost:3000/${user.page_name}`}
          target="_blank"
          rel="noreferrer"
        >
          <QRCode value={`http://localhost:3000/${user.page_name}`} />
        </a>
        <span>Use the QRcode above to advertise your appointment page.</span>
      </Menu>
      <div>
        <UserAppointment
          date={date}
          data={schedule}
          setDate={setSchedulePlusDate}
          plusDate={schedulePlusDate}
        />
      </div>
    </Container>
  )
}

export default UserPage
