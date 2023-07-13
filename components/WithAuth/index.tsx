import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAccount } from '@wagmi/core'

const withAuth = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  const Wrapper: React.FC<T> = (props) => {
    const router = useRouter();
    const account = getAccount()
    const connected = account.isConnected
    // Perform your authentication logic here
    // const isAuthenticated =  true;

    useEffect(() => {
      if (!connected) {
        // Redirect to home page
        router.push('/');
      }
    }, [connected, router]);

    // Render the wrapped component if authenticated, otherwise return null or a loading state
    return connected ? <WrappedComponent {...props} /> :<div> You need to be authenticated</div>;
  };

  return Wrapper;
};

export default withAuth;