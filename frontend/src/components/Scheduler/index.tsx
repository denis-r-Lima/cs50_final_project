import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FcCalendar } from 'react-icons/fc'

import { Container } from './styles'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import Calendar from '../Calendar'

type Appointments = {
  client: string
  phone: string
  date: Date
}

type ApiAppointmentsResponse = {
  client: string
  phone: string
  date: string
}

interface ApiResponse extends AxiosResponse {
  data: {
    appointments: ApiAppointmentsResponse[]
    user_id: string
  }
}

const Scheduler: React.FC = () => {
  const [isPage, setIsPage] = useState<string>('loading')

  const [data, setData] = useState<Appointments[]>([] as Appointments[])
  const [userId, setUserId] = useState<string>('')

  const location = useLocation().pathname.substring(1)

  const apiCall = async (url: string) => {
    let form = new FormData()

    form.append('page', location)
    try {
      const response = (await api.post(url, form)) as ApiResponse
      setUserId(response.data.user_id)
      setData(
        response.data.appointments.map(item => {
          return {
            client: item.client,
            phone: item.phone,
            date: new Date(item.date)
          }
        })
      )
      setIsPage('true')
    } catch (err) {
      console.log(err)
      setIsPage('false')
    }
  }
  useEffect(() => {
    apiCall('/personalpage')
  }, [])

  return (
    <Container>
      {isPage === 'loading' ? (
        <div />
      ) : isPage === 'true' ? (
        <>
          <div>
            <h1>{location} Booking page</h1>
          </div>
          <Calendar userId={userId} appointments={data} apiCall={apiCall} />
          <div>
            <span>
              Powered by:{' '}
            </span>
              <a href="/">
                <FcCalendar />
                <b>AppointmentBooker.com</b>
              </a>
          </div>
        </>
      ) : (
        <h2>404: Page not found</h2>
      )}
    </Container>
  )
}

export default Scheduler
