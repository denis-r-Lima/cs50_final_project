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
  time: number[]
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

      const time = [date.getHours(), date.getMinutes()]
      const client = d.client
      const phone = d.phone
      return { time, client, phone }
    })
    .sort((a, b) => {
      const [aHours, aMinutes] = a.time
      const [bHours, bMinutes] = b.time

      if (aHours > bHours) return 1
      if (aMinutes > bMinutes) return 1

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
        <HiArrowCircleRight onClick={() => setDate(current => {
          return current === 30 ? current : current + 1
        })} 
        style={plusDate === 30 ? { color: '#aaa', cursor: 'not-allowed' } : {}}/>
      </DisplayDate>
      <AppointmentList>
        {forTheDay.length > 0 ? (
          forTheDay.map((item, index) => (
            <li key={index}>
              <div>
                {item.time[0] === 12
                  ? `12:00 PM`
                  : item.time[0] < 12
                  ? `${item.time[0]}`.padStart(2, '0') + ":" +
                    `${item.time[1]}`.padStart(2, '0') + ' AM'
                  : `${item.time[0] - 12}`.padStart(2, '0') + ":" +
                    `${item.time[1]}`.padStart(2, '0') + ' PM'}
              </div>
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
