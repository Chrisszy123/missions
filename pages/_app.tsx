import "../styles/app.sass";
import "./globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
// context
import { WalletContext } from "context/WalletContext";
import { AuthContext } from "context/AuthContext";
import { useState } from "react";
import { WalletConnectConnector } from "wagmi/dist/connectors/walletConnect";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "df9b17276ce0127b50a6d526f70c072c",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const queryClient = new QueryClient();
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const [connected, setConnected] = useState(false);
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [commName, setCommName] = useState("");
  const [commLink, setCommLink] = useState("");
  const [commImage, setCommImage] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commTags, setCommTags] = useState([]);
  const [missionName, setMissionName] = useState("");
  const [missionRewards, SetMissionRewards] = useState("");
  const [mDesc, setMDesc] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
            <WalletContext.Provider
              value={{
                connected,
                setConnected,
                chain,
                setChain,
                account,
                setAccount,
                walletBalance,
                setWalletBalance,
              }}
            >
              <AuthContext.Provider
                value={{
                  user,
                  setUser,
                  setUserId,
                  userId,
                  commName,
                  setCommName,
                  commLink,
                  setCommLink,
                  commImage,
                  setCommImage,
                  commDesc,
                  setCommDesc,
                  commTags,
                  setCommTags,
                  setMissionName,
                  missionName,
                  SetMissionRewards,
                  missionRewards,
                  mDesc,
                  setMDesc,
                }}
              >
                <Head>
                  <meta
                    content="We're shaping the future of decentralized communities, where boundless opportunities await. Step into a world where collaboration and achievement take center stage, as community owners create captivating missions and users embark on thrilling quests."
                    name="O1Node Missions"
                  />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <meta name="theme-color" content="#000000" />
                  <meta name="msapplication-TileColor" content="#da532c" />
                  <meta name="theme-color" content="#ffffff" />
                </Head>
                <Component {...pageProps} />
              </AuthContext.Provider>
            </WalletContext.Provider>
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
