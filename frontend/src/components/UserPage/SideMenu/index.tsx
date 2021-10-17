import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiCalendar, FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { BurgerBar, BurgerMenu, Menu, GeneralMenuItem } from "./styles";

const MENU_ITEMS = [
  {
    label: "Appointments",
    url: "/",
    icon: <FiCalendar />,
  },
  {
    label: "My Account",
    url: "/myaccount",
    icon: <FiUser />,
  },
];

const SideMenu: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const history = useHistory();

  const onBurgerClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  const clickLink = (url: string) => () => {
    history.push(url);
  };

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isOpened && !e.composedPath().includes(menuRef.current!)) {
        setIsOpened(false);
      }
    },
    [isOpened]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <>
      <BurgerMenu onClick={onBurgerClick} className={isOpened ? "opened" : ""}>
        <BurgerBar />
        <BurgerBar />
        <BurgerBar />
      </BurgerMenu>
      <Menu className={isOpened ? "show" : ""} ref={menuRef}>
        {MENU_ITEMS.map((item) => (
          <GeneralMenuItem
            onClick={clickLink(item.url)}
            className={history.location.pathname === item.url ? "current" : ""}
            key={`${item.label} - ${item.url}`}
          >
            <div>{item.icon}</div>
            <div>{item.label}</div>
          </GeneralMenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SideMenu;
