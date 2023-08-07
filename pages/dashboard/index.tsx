import { useEffect, useState, useContext } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import { getOneUser } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { WalletContext } from "context/WalletContext";
import Dashboard from "@/components/SettingsPage";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";
import { useQuery } from "@tanstack/react-query";

const SettingsPage = () => {
  const { status, data: sessionData }: any = useSession();
  const { account } = useContext(WalletContext);
  // create a new user
  const walletAddress = account?.toString().toLowerCase();

  const {
    error,
    status: userStatus,
    data: user,
  } = useQuery({
    queryKey: ["dashboard", `${walletAddress!}`],
    queryFn: () => getOneUser(walletAddress!),
  });

  if (status === "unauthenticated" || sessionData === null) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in " />
      </Layout>
    );
  }

  return (
    <ErrorBoundary>
      <Dashboard
        communities={user?.message?.data?.communities}
        missions={user?.message?.data?.missions}
        status={userStatus}
      />
    </ErrorBoundary>
  );
};

export default SettingsPage;
