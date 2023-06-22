import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import cn from "classnames";
import styles from "./Layout.module.sass";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WalletContext } from "context/WalletContext";

type LayoutProps = {
    layoutNoOverflow?: boolean;
    classHeader?: string;
    headerHide?: boolean;
    noRegistration?: boolean;
    lightHeader?: any;
    emptyHeader?: boolean;
    footerHide?: boolean;
    background?: string;
    children: React.ReactNode;
};

const Layout = ({
    layoutNoOverflow,
    classHeader,
    noRegistration,
    headerHide,
    lightHeader,
    emptyHeader,
    footerHide,
    background,
    children,
}: LayoutProps) => {
    const { pathname } = useRouter();
    const {connected}: any = useContext(WalletContext)

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <>
            <Head>
                <title>O1Node</title>
            </Head>
            <div
                className={cn(styles.layout, {
                    [styles.noOverflow]: layoutNoOverflow,
                })}
                style={{ backgroundColor: background }}
            >
                {!connected ? <div style={{backgroundColor: "red", color: "white", width: "100vw", height: "30px", textAlign: "center"}}> 
                    To fully use the missions DApp please connect wallet.
                </div> : ""}
                {!headerHide && (
                    <Header
                        className={classHeader}
                        noRegistration={noRegistration}
                        light={lightHeader}
                        empty={emptyHeader}
                    />
                )}
                <div className={styles.inner}>{children}</div>
                {!footerHide && <Footer />}
            </div>
        </>
    );
};

export default Layout;
