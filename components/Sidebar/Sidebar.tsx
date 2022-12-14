import React, { FC, useState, useMemo } from "react";

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { menuItems } from "./menuItems";
import { Theme, useTheme } from "../../theme/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

const Sidebar: FC = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 duration-300",
      {
        ["mt-9"]: menu.gap,
        ["mt-2"]: !menu.gap,
        ["bg-light-white"]: activeMenu.id === menu.id,
      }
    );
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);

    if (toggleCollapse) {
      setTheme(Theme.Toggled);
    } else {
      setTheme(Theme.NotToggled);
    }
  };

  const wrapperClasses = classNames(
    "sidebar flex flex-col bg-dark-purple h-screen p-5 pt-8 fixed duration-300",
    {
      ["w-72"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "absolute cursor-pointer -right-3 top-9 w-7 bg-dark-purple border-2 rounded-full",
    {
      "rotate-180": !toggleCollapse,
    }
  );

  const logoWrapperClasses = classNames("cursor-pointer duration-500", {
    "rotate-[360deg]": toggleCollapse,
  });

  const titleWrapperClasses = classNames(
    "text-white origin-left font-medium text-xl duration-200",
    {
      "scale-0": toggleCollapse,
    }
  );

  const subMenuWrapperClasses = classNames("origin-left duration-200", {
    hidden: toggleCollapse,
  });

  const handleLogout = () => logout();

  return (
    <div className={wrapperClasses}>
      <img
        src="/assets/control.png"
        className={collapseIconClasses}
        onClick={handleSidebarToggle}
        width="33px"
        height="33px"
      />
      <div className="flex gap-x-4 items-center">
        <img
          width="33px"
          height="33px"
          src="/assets/logo.png"
          className={logoWrapperClasses}
        />
        <h1 className={titleWrapperClasses}>Luckydraw</h1>
      </div>
      <ul className="pt-6">
        {menuItems.map((menu, index) => {
          return (
            <Link href={menu.link} key={index}>
              <div className={getNavItemClasses(menu)}>
                <img src={`/assets/${menu.icon}.png`} />
                <span className={subMenuWrapperClasses}>{menu.label}</span>
              </div>
            </Link>
          );
        })}
      </ul>
      <div onClick={handleLogout} className={`${getNavItemClasses({})} mt-auto`}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        <span className={subMenuWrapperClasses}>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
