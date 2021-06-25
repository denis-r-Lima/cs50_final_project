import React, { useRef } from 'react'
import { FiSettings, FiCalendar, FiUser } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import {
  BurgerBar,
  BurgerMenu,
  Menu,
  EngineMenuItem,
  GeneralMenuItem,
} from './styles'

const SideMenu: React.FC = () => {

  const menuDiv = useRef<HTMLDivElement>(null)

  const history = useHistory()

  const onBurgerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.contains('opened')
      ? e.currentTarget.classList.remove('opened')
      : e.currentTarget.classList.add('opened')

    menuDiv.current?.classList.contains('show')
      ? menuDiv.current?.classList.remove('show')
      : menuDiv.current?.classList.add('show')
  }

  const clickLink = (url: string) => {
    history.push(url)
  }

  return (
    <>
      <BurgerMenu onClick={e => onBurgerClick(e)}>
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
        <EngineMenuItem onClick={() => clickLink('/settings')}>
          <div>
            <FiSettings />
          </div>
          <div>Settings</div>
        </EngineMenuItem>
        <GeneralMenuItem onClick={() => clickLink('/myaccount')}>
          <div>
            <FiUser />
          </div>
          <div>My Account</div>
        </GeneralMenuItem>
        {/* <QrCodeDiv>
          <a
            href={`http://localhost:3000/${user.page_url}`}
            target="_blank"
            rel="noreferrer"
          >
            <QRCode value={`http://localhost:3000/${user.page_url}`} />
          </a>
          <span>Use the QRcode above to advertise your appointment page.</span>
        </QrCodeDiv> */}
      </Menu>
    </>
  )
}

export default SideMenu