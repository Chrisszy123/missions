import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { WalletContext } from "context/WalletContext";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

export const Connect = (props: any) => {
  const { setConnected, setAccount, setWalletBalance }: any =
    useContext(WalletContext);
  const { data: session, status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { isConnected, address }: any = useAccount();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { chain }: any = useNetwork();
  const { push, reload } = useRouter();

  useEffect(() => {
    if (isConnected && status === "unauthenticated") {
      console.log("mm")
      handleLogin();
    }
  }, [isConnected]);

  const handleLogin = async () => {
    const { message }: any = await requestChallengeAsync({
      address: address,
      chainId: chain.id,
    });
    const signature = await signMessageAsync({ message });
    // redirect user after success authentication to '/dashboard' page
    signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/", //redirect to user dashboard
    });
  };
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
                      e.preventDefault();

                      openConnectModal();
                    }}
                    type="button"
                    style={{ fontSize: "16px" }}
                  >
                    Connect Wallet
                  </button>
                );
              } else {
                setConnected(true);
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
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
