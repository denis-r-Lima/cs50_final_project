import React, { useLayoutEffect, useRef } from 'react'
import { FiCalendar, FiUser } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import {
  BurgerBar,
  BurgerMenu,
  Menu,
  GeneralMenuItem,
} from './styles'

const SideMenu: React.FC = () => {

  const menuDiv = useRef<HTMLDivElement>(null)
  const burgerMenu = useRef<HTMLDivElement>(null)

  const history = useHistory()

  const onBurgerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.contains('opened')
      ? e.currentTarget.classList.remove('opened')
      : e.currentTarget.classList.add('opened')

    menuDiv.current?.classList.contains('show')
      ? menuDiv.current?.classList.remove('show')
      : menuDiv.current?.classList.add('show')
  }

  useLayoutEffect(() => {
    document.addEventListener('mouseup', (e) => {
      const target = burgerMenu.current as HTMLDivElement
      if(menuDiv.current?.classList.contains('show') 
      && !e.composedPath().includes(target)){
        menuDiv.current?.classList.remove('show')
        target.classList.remove('opened')
      }
    })

    return document.removeEventListener('mouseup', (e) => {
      const target = burgerMenu.current as HTMLDivElement
      if(menuDiv.current?.classList.contains('show') 
      && !e.composedPath().includes(target)){
        menuDiv.current?.classList.remove('show')
        target.classList.remove('opened')
      }
    })
  }, [])

  const clickLink = (url: string) => {
    history.push(url)
  }

  return (
    <>
      <BurgerMenu onClick={e => onBurgerClick(e)} ref={burgerMenu}>
        <BurgerBar />
        <BurgerBar />
        <BurgerBar />
      </BurgerMenu>
      <Menu ref={menuDiv}>
        <GeneralMenuItem onClick={() => clickLink('/')}>
          <div>
            <FiCalendar />
          </div>
          <div>Appointments</div>
        </GeneralMenuItem>
        {/* <EngineMenuItem onClick={() => clickLink('/settings')}>
          <div>
            <FiSettings />
          </div>
          <div>Settings</div>
        </EngineMenuItem> */}
        <GeneralMenuItem onClick={() => clickLink('/myaccount')}>
          <div>
            <FiUser />
          </div>
          <div>My Account</div>
        </GeneralMenuItem>
              </Menu>
    </>
  )
}

export default SideMenu
