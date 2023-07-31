import { useEffect, useState, useContext } from "react";
import styles from "@/components/SettingsPage/SettingsPage.module.sass";
import Layout from "@/components/Layout";
import { getOneUser } from "@/utils/axios";
import ErrorBoundary from "pages/_error";
import { WalletContext } from "context/WalletContext";
import Catalog from "@/components/Catalog";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const UserCommunities = () => {
  const [community, setCommunity] = useState([]);
  const { account } = useContext(WalletContext);
  const walletAddress = account?.toString().toLowerCase();

  useEffect(() => {
    getOneUser(walletAddress).then((e) => {
      setCommunity(e.message.data.communities);
    });
  }, [walletAddress]);

  return (
    <ErrorBoundary>
      <Layout layoutNoOverflow noRegistration dashboard>
        <div className=" md:pl-2 md:pt-0 md:pr-10">
          <div className={styles.col}>
            {community?.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <>
                <Catalog
                  title="My Communities"
                  items={community}
                  titleStyle="md:text-[40px] text-[30px]"
                />
              </>
            )}
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export default UserCommunities;

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {
      data: 'success',
    }
  }
}
