import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "./Collection";

const CollectionPage = ({community}: any) => {
    return (
        <Layout layoutNoOverflow lightHeader footerHide >
            <Background image="/images/background-2.jpg" />
            <Collection item={community}/>
        </Layout>
    );
};

export default CollectionPage;
