import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "../icons";

const menuItems = [
  { id: 1, label: "Home", icon: HomeIcon, link: "/dashboard" },
  { id: 2, label: "Missions", icon: ArticleIcon, link: "/dashboard/missions" },
  { id: 3, label: "Communities", icon: UsersIcon, link: "/dashboard/commmunities" },
  { id: 4, label: "Profile", icon: VideosIcon, link: "/dashboard/profile" },
];

const Sidebar = ({ children }: any) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu: any = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen bg-light flex justify-between flex-row w-screen overflow-y-auto no-scrollbar",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0 hidden md:block",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded md:w-full w-auto overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div
        className=" w-auto md:flex relative bottom-0"
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div
          className={classNames(
            styles.wrap,
            "md:sticky fixed bottom-0 w-[100vw] md:w-auto py-[1rem] md:py-[2.5rem] px-[1rem] md:px-[2.5rem] z-30 md:z-0"
          )}
        >
          <div className={classNames(styles.head, " hidden md:flex")}>
            {!toggleCollapse ? (
              <div
                className={classNames(
                  "h1",
                  styles.title,
                  "text-[35px] mb-1 hidden md:block"
                )}
              >
                Dashboard
              </div>
            ) : null}

            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                <CollapsIcon />
              </button>
            )}
          </div>
          <div
            className={classNames(
              styles.menu,
              "ml-0 h-[40px] w-auto flex justify-center items-center md:block md:h-[100%]"
            )}
          >
            {menuItems.map(({ icon: Icon, ...menu }, index) => {
              const classes = getNavItemClasses(menu);
              return (
                <div className={classes} key={index}>
                  <Link href={menu.link}>
                    <a className="flex py-4 px-3 items-center w-full h-full">
                      <div
                        className={classNames({
                          "md:h-[6.25rem] h-[1.5rem]": toggleCollapse,
                        })}
                        style={{ width: "2.5rem" }}
                      >
                        <Icon />
                      </div>
                      {!toggleCollapse && (
                        <button
                          className={classNames(
                            "h4",
                            styles.link,
                            "text-[25px] md:flex hidden"
                          )}
                        >
                          {menu.label}
                        </button>
                      )}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
