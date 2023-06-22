import styles from "./CongratsPage.module.sass";
import Layout from "@/components/Layout";
import Congrats from "@/components/Congrats";

const CongratsPage = () => {
    return (
        <Layout
            classHeader={styles.header}
            background="#F1F4F4"
            layoutNoOverflow
            footerHide
            emptyHeader
        >
            <Congrats
                title="Awesome"
                content="Congratulations! You successfully purchased Escape NFT."
            />
        </Layout>
    );
};

export default CongratsPage;
