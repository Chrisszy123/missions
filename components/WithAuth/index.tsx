import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { getAccount } from "@wagmi/core";
import { WalletContext } from "context/WalletContext";
import { useAccount} from "wagmi"

const withAuth = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Wrapper: React.FC<T> = (props) => {
    const router = useRouter();
    const  {isConnected} = useAccount()
    
    useEffect(() => {
      if (!isConnected) {
        // Redirect to home page
        router.push("/");
      }
    }, [isConnected, router]);

    // Render the wrapped component if authenticated, otherwise return null or a loading state
    return isConnected ? (
      <WrappedComponent {...props} />
    ) : (
      <div> You need to be authenticated</div>
    );
  };

  return Wrapper;
};

export default withAuth;
