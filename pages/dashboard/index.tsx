import { useRef, useState } from "react";
import cn from "classnames";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Upload from "@/components/SettingsPage/Upload";
import Information from "@/components/SettingsPage/Information";
import Wallet from "@/components/SettingsPage/Wallet";
import Notification from "@/components/SettingsPage/Notification";

const SettingsPage = () => {
    const scrollToRefProfile = useRef<any>(null);
    const scrollToRefWallet = useRef<any>(null);
    const scrollToRefNotification = useRef<any>(null);
    const [active, setActive] = useState<any>(scrollToRefProfile);

    const menu = [
        {
            title: "Communities",
            anchor: scrollToRefProfile,
        },
        {
            title: "Missions",
            anchor: scrollToRefWallet,
        },
        {
            title: "Profile",
            anchor: scrollToRefNotification,
        },
    ];

    const handleClick = (anchor: any) => {
        anchor.current.scrollIntoView({
            behavior: "smooth",
        });
        setActive(anchor);
    };

    return (
        <Layout layoutNoOverflow noRegistration dashboard>
            <div className=  "p-6 md:pl-16 md:pt-10 md:pr-10">
                <div className={styles.col}>
                    <div className={styles.section}>
                        <div
                            className={styles.anchor}
                            ref={scrollToRefProfile}
                        ></div>
                        <div className={styles.label}>information</div>
                        <Information />
                    </div>
                    <div className={styles.section} id="wallet">
                        <div
                            className={styles.anchor}
                            ref={scrollToRefWallet}
                        ></div>
                        <div className={styles.label}>wallet</div>
                        <Wallet />
                    </div>
                    <div className={styles.section}>
                        <div
                            className={styles.anchor}
                            ref={scrollToRefNotification}
                        ></div>
                        <div className={styles.label}>notification</div>
                        <Notification />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
