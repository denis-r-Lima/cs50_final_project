import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// import { Container } from './styles';

const Scheduler: React.FC = () => {

  const [ isPage, setIsPage ] = useState<string>('loading')

  const location = useLocation().pathname.substring(1)

  const apiCall = async (url: string) => {
    
    let form = new FormData()

    form.append("page", location)
    try{
      const response = await axios.post(url, form)
      setIsPage('true')
      console.log(response.data)
    }
    catch(err){
      console.log(err)
      setIsPage('false')
    }
  }
  useEffect(() => {
    apiCall(`${process.env.REACT_APP_API_URL}/personalpage`)
  })


  return (
  <>
    {isPage === 'loading'? (
      <h3>Loading</h3>
    ):
    isPage === 'true' ? (
      <h1>
        {location}
      </h1>
      ):
    (
      <p>
        404: Page not found
      </p>
    )}
  </>
  )
}

export default Scheduler
