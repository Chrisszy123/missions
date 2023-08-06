import { useEffect, useState, useContext } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import { getOneUser } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { WalletContext } from "context/WalletContext";
import Catalog from "@/components/Catalog";
import Spotlight from "@/components/Spotlight";
import Dashboard from "@/components/SettingsPage";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import AccessDenied from "@/components/AccessDenied/AccessDenied";

const SettingsPage = () => {
  const { status, data: sessionData }: any = useSession();
  const [community, setCommunity] = useState([]);
  const [mission, setMission] = useState([]);
  const { account } = useContext(WalletContext);
  // create a new user
  const walletAddress = account?.toString().toLowerCase();

  useEffect(() => {
    getOneUser(walletAddress).then((e) => {
      setCommunity(e.message.data.communities);
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
      <Dashboard />
    </ErrorBoundary>
  );
};

export default SettingsPage;
