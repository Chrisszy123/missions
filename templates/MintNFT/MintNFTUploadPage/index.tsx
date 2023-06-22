import { useState } from "react";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Form from "./Form";
import Upload from "./Upload";

const MintNFTPage = () => {
    const [title, setTitle] = useState<string>("The Explorer");
    const [description, setDescription] = useState<string>(
        "We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey. Official website: ui8.net"
    );

    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <Form
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                    />
                }
            >
                <Upload title={title} />
            </LayoutCreate>
        </Layout>
    );
};

export default MintNFTPage;
