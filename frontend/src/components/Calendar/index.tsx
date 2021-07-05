import React, { useRef, useState } from 'react'
import api from '../../utils/api'
import defineDates from '../../utils/defineDates'
import TimeModal from '../TimeModal'

import { Container, Modal } from './styles'

type Appointments = {
  client: string
  phone: string
  date: Date
}

type CalendarProps = {
  userId: string
  appointments: Appointments[]
  addAppointment: (data: Appointments) => void
}

const Calendar: React.FC<CalendarProps> = ({ userId, appointments, addAppointment }) => {
  const [date, setDate] = useState<Date>(new Date())
  const [client, setClient] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [ message, setMessage ] = useState<string | null>(null) 

  const modal = useRef<HTMLDivElement>(null)

  const appointmentsDates = appointments.map(appointment => {
    return appointment.date
  })

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()

  let schedulerData: Date[][] = []

  const numberOfWeeksAvailable = 4

  for (let i = 0; i < numberOfWeeksAvailable; i++) {
    schedulerData.push(defineDates(schedulerData.length))
  }

  const openTimeModal = (day: Date) => {
    modal.current?.classList.add('show')
    setDate(day)
  }

  const onSubmit = async () => {
    modal.current?.classList.remove('show')

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()


    let form = new FormData()

    form.append('client', client)
    form.append('phone', phone)
    form.append('year', String(year))
    form.append('month', String(month))
    form.append('day', String(day))
    form.append('hour', String(hour))
    form.append('minute', String(minute))
    form.append('user_id', userId)

    try{
      await api.post('/make_appointment', form)
      setMessage('Your appointment was successfully made')
    }catch{
      setMessage('It was not possible to complete your appointment')
    }
    setTimeout(() => {
      setMessage(null)
    }, 10000);
    
    addAppointment({client, phone, date})
  }

  return (
    <Container>
      {message && (<h4>{message}</h4>)}
      <table>
        <thead>
          <tr>
            {daysOfTheWeek.map((day, index) => (
              <th key={`${index} -- dayOfWeek`}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedulerData.map((week, index) => (
            <tr key={`${index} + week`}>
              {week.map((day, index2) => (
                <td
                  key={`${day} + ${index2} + ${index}`}
                  className={
                    day.getDay() === 0 ||
                    day.getFullYear() < today.getFullYear() ||
                    (day.getMonth() < today.getMonth() &&
                      day.getFullYear() === today.getFullYear()) ||
                    (day.getDate() < today.getDate() &&
                      day.getMonth() === today.getMonth() &&
                      day.getFullYear() === today.getFullYear())
                      ? 'outdated'
                      : ''
                  }
                  onClick={
                    day.getDay() === 0 ||
                    day.getFullYear() < today.getFullYear() ||
                    (day.getMonth() < today.getMonth() &&
                      day.getFullYear() === today.getFullYear()) ||
                    (day.getDate() < today.getDate() &&
                      day.getMonth() === today.getMonth() &&
                      day.getFullYear() === today.getFullYear())
                      ? () => {}
                      : () => openTimeModal(day)
                  }
                >
                  {month[day.getMonth()]} {day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        ref={modal}
        onClick={e => {
          if (e.target === e.currentTarget)
            e.currentTarget.classList.remove('show')
        }}
      >
        <TimeModal
          date={date}
          phone={phone}
          appointmentsDate={appointmentsDates}
          setDate={setDate}
          setClient={setClient}
          setPhone={setPhone}
          onSubmit={onSubmit}
        />
      </Modal>
    </Container>
  )
}

export default Calendar
