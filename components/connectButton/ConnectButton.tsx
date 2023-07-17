import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { WalletContext } from "context/WalletContext";
import { SiweMessage } from "siwe"
import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { useEffect } from "react"

export const Connect = (props: any) => {
  const { setConnected, setAccount, setWalletBalance }: any =
    useContext(WalletContext);
    const { data: session, status } = useSession()
    const { signMessageAsync } = useSignMessage()
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()
    const handleLogin = async () => {
      try {
        const callbackUrl = "/protected"
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
          nonce: await getCsrfToken(),
        })
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        })
        signIn("credentials", {
          message: JSON.stringify(message),
          redirect: false,
          signature,
          callbackUrl,
        })
      } catch (error) {
        window.alert(error)
      }
    }
    useEffect(() => {
      if (isConnected && !session) {
        handleLogin()
      }
    }, [isConnected])
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        setAccount(account?.address);
        setWalletBalance(account?.displayBalance);
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                     
                        openConnectModal()
                      
                    }}
                    type="button"
                    style={{ fontSize: '16px'}}
                  >
                    Connect Wallet
                  </button>
                );
              } else {
                setConnected(true);
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
