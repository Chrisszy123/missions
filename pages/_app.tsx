import "../styles/app.sass";
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


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [ publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
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
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
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
          }}
        >
          <AuthContext.Provider value={{ user, setUser, setUserId, userId }}>
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
