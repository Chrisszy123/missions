import { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./ChooseWallet.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { Connect } from "@/components/connectButton/ConnectButton";

const tabs = [""];

const wallets = [
  {
    title: "MetaMask",
    image: "/images/meta-mask.svg",
  },
  // {
  //   title: "WalletConnect",
  //   image: "/images/wallet-connect.svg",
  // },
//   {
//     title: "Coinbase Wallet",
//     image: "/images/coin-base.svg",
//   },
//   {
//     title: "MyEtherWallet",
//     image: "/images/my-ether-wallet.svg",
//   },
];

type ChooseWalletProps = {
  onScan?: () => void;
  onClickWallet?: () => void;
};

const ChooseWallet = ({ onScan, onClickWallet }: ChooseWalletProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter()
  const handleAuth0 = () => {
    router.push('/api/auth/login')
  }

  return (
    <div className={styles.choose}>
      <div className={cn("h3", styles.title)}>Login/Register</div>
      <div className={styles.head}>
        <div className={styles.tabs}>
          {tabs.map((item, index) => (
            <button
              className={cn(styles.tab, {
                [styles.active]: activeIndex === index,
              })}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.wallets}>
        {wallets.map((wallet, index) => (
          <Connect
            key={index}
            className={styles.wallet}
            innerClass={styles.inner}
            Iconclass={styles.icon}
            image={wallet.image}
            text={wallet.title}
           
          />
        ))}
         <button
              className={styles.wallet}
              onClick={handleAuth0}
              style={{marginTop: '10px'}}
          >
              <span className={styles.inner}>
                  <span className={styles.icon}>
                      <Image
                          src='/images/auth0.png'
                          width={40}
                          height={40}
                          alt="Wallet"
                      />
                  </span>
                  Web2 Login <Icon name="arrow-right" />
              </span>
          </button>
      </div>
      <div className={styles.btns}>
        <button className={styles.scan} onClick={onScan}>
          Scan to connect
        </button>
      </div>
    </div>
  );
};

export default ChooseWallet;
