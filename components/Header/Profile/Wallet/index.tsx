import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Icon from "@/components/Icon";
import { Connect } from "@/components/connectButton/ConnectButton";
import { useContext } from "react";
import { WalletContext } from "context/WalletContext";
import { AuthContext } from "context/AuthContext";
import truncateEthAddress from "truncate-eth-address";

type WalletProps = {
  onDisconnect: any;
};

const Wallet = ({ onDisconnect }: WalletProps) => {
  const { connected, account, walletBalance }: any = useContext(WalletContext);
  // const {user}: any = useContext(AuthContext)
  const actions = [
      // {
      //     title: `${user ? "Logout" : "Web2 Login"}`,
      //     icon: "logout",
      //     url: `${user ? "/api/auth/logout" : "/api/auth/login"}`,
      // },
      {
          title: "Disconnect",
          icon: "close-square",
          onClick: onDisconnect,
          url: '/api/auth/signout'
      },
  ];

  return (
    <div className={styles.wallet}>
      <div className={styles.head}>
        <div className={styles.title}>
          <Connect
            image="/"
            text={connected ? "connected" : "Connect Wallet"}
          />
        </div>
        <div className={styles.actions}>
          {actions.map((action: any, index: number) =>
                        action.onClick ? (
                            <button
                                className={styles.action}
                                onClick={action.onClick}
                                key={index}
                            >
                                <Icon name={action.icon} />
                                {action.title}
                            </button>
                        ) : (
                            <Link href={action.url} key={index}>
                                <a className={styles.action}>
                                    <Icon name={action.icon} />
                                    {action.title}
                                </a>
                            </Link>
                        )
                    )}
        </div>
      </div>
      <div className={styles.details}>
        {account ? (
          <div className={styles.code}>{truncateEthAddress(account)}</div>
        ) : (
          ""
        )}

        <div className={cn("h3", styles.line)}>
          <div className={styles.crypto}>{walletBalance}</div>
          <div className={styles.price}></div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
