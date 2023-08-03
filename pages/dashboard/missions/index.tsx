import { useEffect, useState, useContext } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import { getOneUser } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { WalletContext } from "context/WalletContext";
import Spotlight from "@/components/Spotlight";
import {useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";

const UserMissions = () => {
  const { status, data: sessionData }: any = useSession();
  const [mission, setMission] = useState([]);
  const { account } = useContext(WalletContext);
  // create a new user
  const walletAddress = account?.toString().toLowerCase();

  useEffect(() => {
    getOneUser(walletAddress).then((e) => {
      setMission(e.message.data.missions);
    });
  }, [walletAddress]);
  if (status === "unauthenticated" || sessionData === null) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in " />
      </Layout>
    );
  }
  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration dashboard>
        <div className="p-6 md:pl-1 md:pt-0 md:pr-10">
          <div className={styles.col}>
            {mission?.length === 0 ? (
              <div> loading... </div>
            ) : (
              <Spotlight
                missions={mission}
                title="My Missions"
                style="bg-transparent"
                titleStyle="text-[#000] text-[30px] md:text-[40px]"
                nameStyle="text-[#000]"
                btnStyle="bg-black text-white hover:bg-gray-800 hover:text-white"
              />
            )}
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export default UserMissions;

