import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import { Container } from './styles';

const Scheduler: React.FC = () => {

  const [ isPage, setIsPage ] = useState<string>('loading')

  const [ data, setData ] = useState<any>({})


  const location = useLocation().pathname.substring(1)

  const apiCall = async (url: string) => {
    
    let form = new FormData()

    form.append("page", location)
    try{
      const response = await axios.post(url, form)
      setIsPage('true')
      setData(response.data.page)
      console.log(response.data)
    }
    catch(err){
      console.log(err)
      setIsPage('false')
    }
  }
  useEffect(() => {
    apiCall(`${process.env.REACT_APP_API_URL}/personalpage`)
  }, [])


  return (
  <Container>
    {isPage === 'loading'? (
      <h2>Loading</h2>
    ):
    isPage === 'true' ? (
      <h2>
        {JSON.stringify(data)}
      </h2>
      ):
    (
      <h2>
        404: Page not found
      </h2>
    )}
  </Container>
  )
}

export default Scheduler
