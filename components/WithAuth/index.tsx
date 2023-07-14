import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { getAccount } from "@wagmi/core";
import { WalletContext } from "context/WalletContext";

const withAuth = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Wrapper: React.FC<T> = (props) => {
    const router = useRouter();
    const { connected } = useContext(WalletContext);

    useEffect(() => {
      if (!connected) {
        // Redirect to home page
        router.push("/");
      }
    }, [connected, router]);

    // Render the wrapped component if authenticated, otherwise return null or a loading state
    return connected ? (
      <WrappedComponent {...props} />
    ) : (
      <div> You need to be authenticated</div>
    );
  };

  return Wrapper;
};

export default withAuth;
