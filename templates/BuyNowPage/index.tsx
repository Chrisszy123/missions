import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Price from "@/components/Price";
import Details from "@/components/Details";

const statistics = [
    {
        label: "Created by",
        avatar: "/images/avatar.jpg",
        history: true,
        title: "Dash",
        login: "randomdash",
    },
    {
        label: "Collection",
        image: "/images/balls.jpg",
        title: "Escape",
        category: "cute",
    },
];

const links = [
    {
        title: "View on Etherscane",
        icon: "country",
        url: "https://ui8.net/",
    },
    {
        title: "View metadata",
        icon: "link",
        url: "https://ui8.net/",
    },
    {
        title: "View on IPFS",
        icon: "link",
        url: "https://ui8.net/",
    },
];

const provenance = [
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                Minted by <span>@randomdash</span>
            </>
        ),
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
];

const BuyNowPage = () => {
    return (
        <Layout layoutNoOverflow footerHide>
            <Description
                image="/images/main-pic-1.jpg"
                captionHide
                title="Escape"
                date="Minted on Aug 18, 2022"
                statistics={statistics}
                links={links}
                addTags
                provenance={provenance}
                content="We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you."
            >
                <>
                    <Details
                        title="Buy now"
                        content={
                            <>
                                Confirm the transaction to buy{" "}
                                <strong>Escape NFT</strong>
                            </>
                        }
                        linkUrl="/article"
                        linkTitle="Learn how to buy on Crypter"
                    />
                    <Price
                        title="Total price"
                        price="1.00"
                        buttonText="confirm"
                        content="We are laying the groundwork for web3 — the next generation of the internet full of limitless possibilities. Join the millions of creators, collectors, and curators who are on this journey with you."
                    />
                </>
            </Description>
        </Layout>
    );
};

export default BuyNowPage;
