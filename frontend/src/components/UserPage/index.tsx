import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

import api from '../../utils/api'
import scheduleDate from '../../utils/scheduleDate'
import { useIsAuthenticatedContext } from '../../context/isAuthenticatedContext'

import Header from '../Header'
import UserAppointment from '../UserAppointment'
import SideMenu from './SideMenu'

import { Container } from './styles'

type ScheduleProps = {
  phone: string
  client: string
  date: string
}

interface ApiResponse extends AxiosResponse {
  data: { schedule: ScheduleProps[] }
}

const UserPage: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleProps[]>([])
  const [schedulePlusDate, setSchedulePlusDate] = useState<number>(0)

  const { user } = useIsAuthenticatedContext()

  const id = user.id

  const date = scheduleDate(schedulePlusDate)

  async function apiCall() {
    try {
      const response = (await api.get('/schedule', {
        params: {
          user_id: id
        }
      })) as ApiResponse
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
      <SideMenu />
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
