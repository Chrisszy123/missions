import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Collection from "./Collection";

const CollectionPage = () => {
    return (
        <Layout layoutNoOverflow lightHeader footerHide>
            <Background image="/images/background-2.jpg" />
            <Collection />
        </Layout>
    );
};

export default CollectionPage;
