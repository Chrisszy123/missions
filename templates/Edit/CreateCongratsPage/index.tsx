import styles from "./CreateCongratsPage.module.sass";
import Layout from "@/components/Layout";
import Congrats from "@/components/Congrats";

const CreatPage = () => {
    return (
        <Layout
            classHeader={styles.header}
            background="#F1F4F4"
            layoutNoOverflow
            footerHide
            emptyHeader
        >
            <Congrats
                title="Congrats"
                content={
                    <>
                        You’ve now created your community!{" "}
                        <br></br>This is an important first step for all
                        creators to make as you create new missions on o1node
                    </>
                }
            />
        </Layout>
    );
};

export default CreatPage;
