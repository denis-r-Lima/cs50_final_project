import React from 'react'

import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi'
import { transformDate } from '../../utils/scheduleDate'

import { AppointmentList, DisplayDate } from './styles'

type ScheduleData = {
  client: string
  phone: string
  date: string
}

type UserAppointmentProps = {
  date: Date
  data: ScheduleData[]
  setDate: React.Dispatch<React.SetStateAction<number>>
  plusDate: number
}

type AppointmentForTheDay = {
  time: string
  client: string
  phone: string
}

const UserAppointment: React.FC<UserAppointmentProps> = ({
  date,
  data,
  setDate,
  plusDate
}) => {
  const forTheDay: AppointmentForTheDay[] = data
    .filter(d => {
      const scheduleDate = new Date(d.date)

      return (
        date.getDate() === scheduleDate.getDate() &&
        date.getMonth() === scheduleDate.getMonth() &&
        date.getFullYear() === scheduleDate.getFullYear()
      )
    })
    .map(d => {
      const date = new Date(d.date)

      const time =
        `${date.getHours()}:` + `${date.getMinutes()}`.padStart(2, '0')
      const client = d.client
      const phone = d.phone
      return { time, client, phone }
    })
    .sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(':')
      const [bHours, bMinutes] = b.time.split(':')

      if (Number(aHours) > Number(bHours)) return 1
      if (Number(aMinutes) > Number(bMinutes)) return 1

      return -1
    })

  return (
    <div>
      <DisplayDate>
        <HiArrowCircleLeft
          onClick={() =>
            setDate(current => {
              return current === 0 ? current : current - 1
            })
          }
          style={plusDate === 0 ? { color: '#aaa', cursor: 'not-allowed' } : {}}
        />
        <h3>{transformDate(date)}</h3>
        <HiArrowCircleRight onClick={() => setDate(current => current + 1)} />
      </DisplayDate>
      <AppointmentList>
        {forTheDay.length > 0 ? (
          forTheDay.map((item, index) => (
            <li key={index}>
              <div>{item.time}</div>
              <div>
                <p>
                  <b>Client: </b>
                  {item.client}
                </p>
                <p>
                  <b>Phone #: </b>
                  {item.phone}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>You don't have appointments for the day</p>
        )}
      </AppointmentList>
    </div>
  )
}

export default UserAppointment
