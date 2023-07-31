import { useRef } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import Information from "@/components/SettingsPage/Information";
import Wallet from "@/components/SettingsPage/Wallet";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const ProfilePage = () => {
  const scrollToRefProfile = useRef<any>(null);
  const scrollToRefWallet = useRef<any>(null);

  return (
    <Layout layoutNoOverflow noRegistration dashboard>
      <div className="p-6 md:pl-16 md:pt-10 md:pr-10">
        <div className={styles.col}>
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
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: "success",
    },
  };
};
