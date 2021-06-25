import React from 'react'
import { useRef } from 'react'
import { transformDate } from '../../utils/scheduleDate'

import { ClientModal, Container } from './styles'

type TimeModalProps = {
  date: Date
  phone: string
  appointmentsDate: Date[]
  setDate: React.Dispatch<React.SetStateAction<Date>>
  setClient: React.Dispatch<React.SetStateAction<string>>
  setPhone: React.Dispatch<React.SetStateAction<string>>
  onSubmit: () => void
}

const TimeModal: React.FC<TimeModalProps> = ({
  date,
  phone,
  appointmentsDate,
  setDate,
  setClient,
  setPhone,
  onSubmit
}) => {
  const clientModalRef = useRef<HTMLDivElement>(null)
  
  const timeArr = new Array(9).fill(0)

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!/[^0-9]/g.test(e.currentTarget.value)) setPhone(e.currentTarget.value)
  }

  const timeSet = (time: number) => {
    let newDate = date
    setDate(new Date(newDate.setHours(time, 0, 0, 0)))
    clientModalRef.current?.classList.add('display')
  }

  const appointmentsHours = appointmentsDate
    .filter(appointment => {
      return (
        appointment.getDate() === date.getDate() &&
        appointment.getMonth() === date.getMonth() &&
        appointment.getFullYear() === date.getFullYear()
      )
    })
    .map(appointment => {
      return appointment.getHours()
    })



  const submitAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clientModalRef.current?.classList.remove('display')
    document.querySelectorAll('input').forEach(input => (input.value = ''))
    setPhone('')
    onSubmit()
  }

  return (
    <Container>
      <h2>{transformDate(date)}</h2>
      <ul>
        {timeArr.map((_time, index) => (
          <li
            key={index}
            className={appointmentsHours.includes(index + 8) ? 'occupied' : ''}
            onClick={
              appointmentsHours.includes(index + 8)
                ? () => {}
                : () => timeSet(index + 8)
            }
          >
            {index + 8 < 12
              ? `${index + 8}:00 AM`
              : index + 8 === 12
              ? '12:00 PM'
              : `${index + 8 - 12}:00 PM`}
          </li>
        ))}
      </ul>
      <ClientModal
        ref={clientModalRef}
        onClick={e => {
          if (e.target === e.currentTarget)
            e.currentTarget.classList.remove('display')
        }}
      >
        <div>
          <h3>{transformDate(date, true)}</h3>
          <form onSubmit={e => submitAppointment(e)}>
            <fieldset>
              <legend>First name</legend>
              <input
                required
                autoComplete="off"
                type="text"
                name="username"
                onChange={e => setClient(e.currentTarget.value)}
              />
            </fieldset>
            <fieldset>
              <legend>Phone number</legend>
              <input
                required
                autoComplete="off"
                type="text"
                name="username"
                value={phone}
                onChange={e => onPhoneChange(e)}
              />
            </fieldset>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </ClientModal>
    </Container>
  )
}

export default TimeModal
