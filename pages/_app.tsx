import "../styles/app.sass";
import "./globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// context
import { WalletContext } from "context/WalletContext";
import { AuthContext } from "context/AuthContext";
import { useState } from "react";
import { WalletConnectConnector } from "wagmi/dist/connectors/walletConnect";

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

function MyApp({ Component, pageProps }: AppProps) {
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
    <WagmiConfig config={wagmiConfig}>
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
              setMDesc
            }}
          >
            <UserProvider>
              
                <Component {...pageProps} />
              
            </UserProvider>
          </AuthContext.Provider>
        </WalletContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
