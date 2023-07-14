import { useState, useContext, useEffect, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useUser } from "@auth0/nextjs-auth0/client";
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
import { AuthContext } from "context/AuthContext";
import { resultSearch } from "@/mocks/resultSearch";
import { createUser, getOneUser } from "@/utils/axios";
import { Connect } from "@/components/connectButton/ConnectButton";

const menu = [
  {
    title: "Communities",
    url: "/communities", // change to dashboar,
  },
  // {
  //   title: "About",
  //   url: "#",
  // },
];

type HeaderProps = {
  className?: string;
  noRegistration?: boolean;
  light?: boolean;
  empty?: boolean;
  isCommunity?: boolean;
  white?: boolean;
};

const Header = ({
  className,
  noRegistration,
  light,
  empty,
  isCommunity,
  white,
}: HeaderProps) => {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);
  useHotkeys("esc", () => setVisibleProfile(false));
  //const {user, error, isLoading} = useUser()
  const { connected, account }: any = useContext(WalletContext);
  const { setUser }: any = useContext(AuthContext);
  
  // create a new user
  const walletAddress = account?.toString().toLowerCase();

  const CreateUser = () => {
    const user = {
      walletAddress,
    };
    if (user.walletAddress === "" || undefined || null) return;
    createUser(user)
      .then((u) => {})
      .catch((e) => {});
  };

  const GetUser = () => {
    getOneUser(walletAddress).then((u) => setUser(u));
    return;
  };

  useEffect(() => {
    if (!walletAddress) return;
    GetUser();
    CreateUser();
  }, [walletAddress]);

  // const handleClick = () => {
  //   setConnect(false);
  //   setRegistration(true);
  // };
  //
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
            <Logo
              className={styles.logo}
              light={visibleProfile || light}
              white={white}
            />
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
              <Logo
                className={styles.logo}
                light={visibleProfile || light}
                white={white}
              />
              <Search
                className={styles.search}
                result={resultSearch}
                light={visibleProfile || light}
              />
            </div>
            <div className={styles.col}>
              <Discover
                className={styles.discover}
                isCommunity={isCommunity}
                light={visibleProfile || light}
              />
              <div className={styles.navigation}>
                {menu.map((link, index) => (
                  <Link href={link.url} key={index}>
                    <a className={styles.link}>{link.title}</a>
                  </Link>
                ))}
              </div>
              <div
                className={cn(
                  "button-stroke button-medium",
                  styles.button,
                  styles.connect
                )}
              >
                {connected ? <div>{account}</div> : <Connect />}
              </div>
              <Link href="#">
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
      {/* {!connected ? (
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
      ) : (
        null
      )} */}
    </>
  );
};

export default Header;
