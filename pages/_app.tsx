import "../styles/app.sass";
import "./globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
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

function MyApp({ Component, pageProps }: AppProps<{
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
              setMDesc
            }}
          >
            
            <Head>
                    <meta
                        content="Epic NFT Marketplace UI Design Kit"
                        name="Crypter v.2 - NFT Marketplace UI Kit"
                    />
                    <meta
                        content="Crypter v.2 - NFT Marketplace UI Kit"
                        property="og:title"
                    />
                    <meta
                        content="Epic NFT Marketplace UI Design Kit"
                        property="og:description"
                    />
                    <meta
                        content="%PUBLIC_URL%/fb-og-image.png"
                        property="og:image"
                    />
                    <meta
                        property="og:url"
                        content="https://ui8.net/ui8/products/crypter-v2-nft-marketplace-ui-kit"
                    />
                    <meta
                        property="og:site_name"
                        content="Crypter v.2 - NFT Marketplace UI Kit"
                    />
                    <meta
                        content="Crypter v.2 - NFT Marketplace UI Kit"
                        property="twitter:title"
                    />
                    <meta
                        content="Epic NFT Marketplace UI Design Kit"
                        property="twitter:description"
                    />
                    <meta
                        content="%PUBLIC_URL%/twitter-card.png"
                        property="twitter:image"
                    />
                    <meta property="og:type" content="Article" />
                    <meta content="summary" name="twitter:card" />
                    <meta name="twitter:site" content="@ui8" />
                    <meta name="twitter:creator" content="@ui8" />
                    <meta property="fb:admins" content="132951670226590" />
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
  );
}

export default MyApp;
