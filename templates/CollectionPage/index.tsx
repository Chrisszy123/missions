import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "./Collection";

const CollectionPage = ({ community }: any) => {
  return (
    <Layout layoutNoOverflow lightHeader footerHide noRegistration>
      {community && community ? (
        <>
          <Background image="/images/background-2.jpg" />
          <Collection item={community} />
        </>
      ) : (
        <div>data loading...</div>
      )}
    </Layout>
  );
};

export default CollectionPage;
