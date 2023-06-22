import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <div style={{ padding: 40 }}>
            <Link href="/">
                <a>Home page</a>
            </Link>
            <br></br>
            <Link href="/profile">
                <a>Profile page</a>
            </Link>
            <br></br>
            <Link href="/notification">
                <a>Notification page</a>
            </Link>
            <br></br>
            <Link href="/discover">
                <a>Discover page</a>
            </Link>
            <br></br>
            <Link href="/feed">
                <a>Feed page</a>
            </Link>
            <br></br>
            <Link href="/discover/ranking">
                <a>Ranking page</a>
            </Link>
            <br></br>
            <Link href="/create">
                <a>Create (no collection) page</a>
            </Link>
            <br></br>
            <Link href="/create/with-collection">
                <a>Create (collection available) page</a>
            </Link>
            <br></br>
            <Link href="/create/step-1">
                <a>Create (step 1) page</a>
            </Link>
            <br></br>
            <Link href="/create/step-2">
                <a>Create (step 2) page</a>
            </Link>
            <br></br>
            <Link href="/create/congrats">
                <a>Create congrats page</a>
            </Link>
            <br></br>
            <Link href="/collection-first-view">
                <a>Collection first view page</a>
            </Link>
            <br></br>
            <Link href="/collection">
                <a>Collection details page</a>
            </Link>
            <br></br>
            <Link href="/mint-nft">
                <a>Mint NFT placeholder page</a>
            </Link>
            <br></br>
            <Link href="/mint-nft/upload">
                <a>Mint NFT upload page</a>
            </Link>
            <br></br>
            <Link href="/mint-nft/preview-mode">
                <a>Mint NFT preview mode page</a>
            </Link>
            <br></br>
            <Link href="/mint-nft/sign-wallet">
                <a>Mint NFT sign wallet page</a>
            </Link>
            <br></br>
            <Link href="/mint-nft/congrats">
                <a>Mint NFT congrats page</a>
            </Link>
            <br></br>
            <Link href="/share-nft">
                <a>Share NFT page</a>
            </Link>
            <br></br>
            <Link href="/set-price">
                <a>Set price page</a>
            </Link>
            <br></br>
            <Link href="/settings">
                <a>Settings page</a>
            </Link>
            <br></br>
            <Link href="/buy-now">
                <a>Buy now page</a>
            </Link>
            <br></br>
            <Link href="/place-a-bid">
                <a>Place a bid page</a>
            </Link>
            <br></br>
            <Link href="/make-offer">
                <a>Make offer page</a>
            </Link>
            <br></br>
            <Link href="/congrats">
                <a>Congrats page</a>
            </Link>
            <br></br>
            <Link href="/help">
                <a>Help center page</a>
            </Link>
            <br></br>
            <Link href="/help/category">
                <a>Help center (category) page</a>
            </Link>
            <br></br>
            <Link href="/help/detail">
                <a>Help center (detail) page</a>
            </Link>
            <br></br>
            <Link href="/blog">
                <a>Blog page</a>
            </Link>
            <br></br>
            <Link href="/blog/detail">
                <a>Blog (detail) page</a>
            </Link>
            <br></br>
            <Link href="/nft">
                <a>NFT detail page</a>
            </Link>
            <br></br>
            <Link href="/nft/current-bid">
                <a>NFT detail (current bid) page</a>
            </Link>
        </div>
    );
};

export default Home;
