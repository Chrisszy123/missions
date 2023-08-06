import { useRef, useState } from "react";
import cn from "classnames";
import styles from "./SettingsPage.module.sass";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Upload from "./Upload";
import Information from "./Information";
import CommunityPage from "../Create/CreatePage";
import MissionPage from "../Create/CreateWithCollectionPage";
import Wallet from "./Wallet";
import Notification from "./Notification";

const SettingsPage = () => {
  const scrollToRefProfile = useRef<any>(null);
  const scrollToRefWallet = useRef<any>(null);
  const scrollToRefNotification = useRef<any>(null);
  const [active, setActive] = useState<any>(1);

  const menu = [
    {
      title: "General",
      anchor: 1,
    },
    {
      title: "Communities",
      anchor: 2,
    },
    {
      title: "Missions",
      anchor: 3,
    },
  ];
  const RightSide = () => {
    if (active === 1) {
      return (
        <div>
          <div className={styles.section}>
            <div className={styles.anchor} ref={scrollToRefProfile}></div>
            <div className={styles.label}>information</div>
            <Information />
          </div>
          <div className={styles.section} id="wallet">
            <div className={styles.anchor} ref={scrollToRefWallet}></div>
            <div className={styles.label}>wallet</div>
            <Wallet />
          </div>
          <div className={styles.section}>
            <div className={styles.anchor} ref={scrollToRefNotification}></div>
            <div className={styles.label}>notification</div>
            <Notification />
          </div>
        </div>
      );
    }else if(active === 2) {
        return(
            <CommunityPage />
        )
    }else{
        return(
           <MissionPage />
        )
    }
  };
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>Dashboard</div>
            </div>
            <div className={styles.menu}>
              {menu.map((link, index) => (
                <button
                  className={cn("h4", styles.link, {
                    [styles.active]: link.anchor === active,
                  })}
                  key={index}
                  onClick={() => setActive(link.anchor)}
                >
                  {link.title}
                  <Icon name="arrow-right" />
                </button>
              ))}
            </div>
            <Upload />
          </div>
        </div>
        <div className={styles.col}>
          <RightSide />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
