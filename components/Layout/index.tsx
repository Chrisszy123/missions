import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import cn from "classnames";
import styles from "./Layout.module.sass";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { WalletContext } from "context/WalletContext";
import { AuthContext } from "context/AuthContext";
import { getUsers } from "@/utils/axios";
import Sidebar from "../Sidebar";

type LayoutProps = {
  layoutNoOverflow?: boolean;
  classHeader?: string;
  headerHide?: boolean;
  noRegistration?: boolean;
  lightHeader?: any;
  emptyHeader?: boolean;
  footerHide?: boolean;
  background?: string;
  Link?: any;
  isCommunity?: boolean;
  white?: boolean;
  children: React.ReactNode;
  dashboard?: boolean;
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
  isCommunity,
  white,
  dashboard,
}: LayoutProps) => {
  const { pathname } = useRouter();

  const { connected }: any = useContext(WalletContext);
  //const {user}: any = useContext(AuthContext)
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
        {!connected ? <Banner /> : ""}
        {!headerHide && (
          <Header
            className={classHeader}
            noRegistration={connected ? !noRegistration : noRegistration}
            light={lightHeader}
            empty={emptyHeader}
            isCommunity={isCommunity}
            white={white}
          />
        )}
        {dashboard ? (
          <>
            <Sidebar>
              {" "}
              <div className={styles.inner}>{children}</div>{" "}
              
            </Sidebar>
            {!footerHide && <Footer />}
            </>
        ) : (
            <div className={styles.inner}>{children}
             {!footerHide && <Footer />}</div>
         
        )}

       
      </div>
    </>
  );
};

export default Layout;
