import { useState, useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
//import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ConnectWallet from "@/components/ConnectWallet";
import Search from "./Search";
import Discover from "./Discover";
import Profile from "./Profile";
import Menu from "./Menu";
import { WalletContext } from "context/WalletContext";

import { resultSearch } from "@/mocks/resultSearch";

const menu = [
  {
    title: "Discover",
    url: "/discover",
  },
  {
    title: "Feed",
    url: "/feed",
  },
];

type HeaderProps = {
  className?: string;
  noRegistration?: boolean;
  light?: boolean;
  empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);
  useHotkeys("esc", () => setVisibleProfile(false));
  const { connected, account }: any = useContext(WalletContext);

  const handleClick = () => {
    setConnect(false);
    setRegistration(true);
  };
  const handleConnect = () => {
    if(!connected){
        setConnect(true)
    }else{
        return
    }
  }
  return (
    <>
      <header
        className={cn(
          styles.header,
          {
            [styles.profileOpen]: visibleProfile,
            [styles.light]: visibleProfile || light,
            [styles.empty]: empty,
            [styles.noRegistration]: noRegistration && !registration,
          },
          className
        )}
      >
        {empty ? (
          <>
            <Logo className={styles.logo} light={visibleProfile || light} />
            <Profile
              className={styles.profile}
              headClassName={styles.profileHead}
              bodyClassName={styles.profileBody}
              onOpen={() => setVisibleProfile(!visibleProfile)}
              onClose={() => setVisibleProfile(false)}
              visible={visibleProfile}
            />
          </>
        ) : (
          <>
            <div className={styles.col}>
              <Logo className={styles.logo} light={visibleProfile || light} />
              <Search
                className={styles.search}
                result={resultSearch}
                light={visibleProfile || light}
              />
            </div>
            <div className={styles.col}>
              <Discover
                className={styles.discover}
                light={visibleProfile || light}
              />
              <div className={styles.navigation}>
                {menu.map((link, index) => (
                  <Link href={link.url} key={index}>
                    <a className={styles.link}>{link.title}</a>
                  </Link>
                ))}
              </div>
              <Link href="/create">
                <a
                  className={cn(
                    "button-stroke button-medium",
                    styles.button,
                    styles.create
                  )}
                >
                  <span>create</span>
                  <Icon name="plus" />
                </a>
              </Link>
                <button
                  className={cn(
                    "button-stroke button-medium",
                    styles.button,
                    styles.connect
                  )}
                  onClick={() => setConnect(true)}
                >
                  {connected ? `${account}` : "Login"}
                </button>
              <Link href="/notification">
                <a className={cn(styles.notification, styles.active)}>
                  <Icon name="flash" />
                </a>
              </Link>
              <Profile
                className={styles.profile}
                onOpen={() => setVisibleProfile(!visibleProfile)}
                onClose={() => setVisibleProfile(false)}
                visible={visibleProfile}
              />
              <Menu classBurger={styles.burger} resultSearch={resultSearch} />
            </div>
          </>
        )}
      </header>
      <div
        className={cn(styles.overlay, {
          [styles.visible]: visibleProfile,
        })}
      ></div>
      <Modal
        className={styles.modal}
        closeClassName={styles.close}
        visible={connected ? !connect : connect}
        onClose={() => setConnect(false)}
      >
        <ConnectWallet
          onClickLogo={() => setConnect(false)}
          onContinue={handleClick}
        />
      </Modal>
    </>
  );
};

export default Header;
