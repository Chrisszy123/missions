import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "./Collection";

const CollectionPage = ({ community }: any) => { //lightheader and white
  return (
    <Layout layoutNoOverflow footerHide noRegistration isCommunity={true}> 
      {community && community ? (
        <>
          <Background/>
          <Collection item={community} />
        </>
      ) : (
        <div>data loading...</div>
      )}
    </Layout>
  );
};

export default CollectionPage;
