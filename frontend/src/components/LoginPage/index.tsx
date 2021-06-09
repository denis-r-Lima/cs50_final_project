import axios from 'axios'
import React, { useRef, useState } from 'react'
import InputCheck from '../../utils/inputChecker'

import Header from '../Header'
import {
  Background,
  Container,
  LoginDiv,
  Register,
  StyledForm,
  TextButton
} from './styles'

const Login: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const [pageName, setPageName] = useState<string | null>(null)

  const loginDiv = useRef<HTMLDivElement>(null)
  const registerDiv = useRef<HTMLDivElement>(null)

  const registerFormHandler = () => {
    registerDiv.current?.classList.contains('show')
      ? registerDiv.current.classList.remove('show')
      : registerDiv.current?.classList.add('show')

    document.querySelectorAll('input').forEach(input => {
      input.value = ''
    })

    setMessage(null)
    setMessage(null)
    setUsername(null)
    setEmail(null)
    setPassword(null)
    setConfirmation(null)
    setPageName(null)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const check = validateInputs(
      username as string,
      password as string,
      pageName,
      confirmation,
      email
    )

    if (check) {
      let form = new FormData()
      form.append('username', username as string)
      form.append('password', password as string)
      form.append('email', email as string)
      form.append('confirmation', confirmation as string)
      form.append('pageName', pageName as string)


      try{
         const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/register`,
          form
        )
        console.log(response)
      }catch({response}){
        setMessage(response.data.message)
      }
      
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let form = new FormData()
    form.append('username', username as string)
    form.append('password', password as string)

    try{
      const response = await axios.post(
       `${process.env.REACT_APP_API_URL}/login`,
       form
     )
     console.log(response)
   }catch({response}){
     setMessage(response.data.message)
   }
   
  }

  const validateInputs = (
    username: string,
    password: string,
    personalPage: string | null = null,
    confirmation: string | null = null,
    email: string | null = null
  ) => {
    try {
      const check = new InputCheck(
        username,
        password,
        personalPage,
        confirmation,
        email
      ).test()

      setMessage(null)

      return check
    } catch (err) {
      setMessage(err.message)

      return false
    }
  }

  return (
    <>
      <Background />
      <Container>
        <Header />
        <LoginDiv ref={loginDiv}>
          <h2>Login</h2>
          <StyledForm onSubmit={e => handleLogin(e)}>
            <fieldset>
              <legend>Username</legend>
              <input
                autoComplete="off"
                autoFocus
                type="text"
                name="username"
                required
                onChange={e => setUsername(e.currentTarget.value)}
              />
            </fieldset>
            <fieldset>
              <legend>Password</legend>
              <input
                required
                autoComplete="off"
                type="password"
                name="password"
                onChange={e => setPassword(e.currentTarget.value)}
              />
            </fieldset>
            {message ? <p>{message}</p> : <></>}
            <button type="submit">Login</button>
          </StyledForm>
          <p>
            Don`t have an account? Register{' '}
            <TextButton onClick={registerFormHandler}>here</TextButton>
          </p>
        </LoginDiv>
      </Container>
      <Register ref={registerDiv}>
        <h2>Register</h2>

        <StyledForm onSubmit={e => handleRegister(e)}>
          <fieldset>
            <legend>Username</legend>
            <input
              required
              autoComplete="off"
              type="text"
              name="username"
              onChange={e => setUsername(e.currentTarget.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              required
              autoComplete="off"
              type="email"
              name="email"
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              required
              autoComplete="off"
              type="password"
              name="password"
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Confirm Password</legend>
            <input
              required
              autoComplete="off"
              type="password"
              name="password"
              onChange={e => setConfirmation(e.currentTarget.value)}
            />
          </fieldset>
          <fieldset>
            <legend>AppointmentBooker.com/</legend>
            <input
              required
              autoComplete="off"
              type="text"
              name="personalPage"
              placeholder="Your booking page name here"
              onChange={e => setPageName(e.currentTarget.value)}
            />
          </fieldset>
          {message ? <p>{message}</p> : <></>}
          <button type="submit">Register</button>
        </StyledForm>
        <p>
          Already have an account? Login{' '}
          <TextButton onClick={registerFormHandler}>here</TextButton>
        </p>
      </Register>
    </>
  )
}

export default Login
