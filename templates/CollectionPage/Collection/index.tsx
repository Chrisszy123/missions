import { useState } from "react";
import Link from "next/link";
import styles from "./Collection.module.sass";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import DetailsCollection from "@/components/DetailsCollection";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Owners from "@/components/Owners";
import Activity from "../Activity";

import { nfts } from "@/mocks/tokens";
import { followers } from "@/mocks/followers";
import { activity } from "@/mocks/activity";

const detailsList = [
    {
        label: "NFTs",
        value: "35",
    },
    {
        label: "Owners",
        value: "5",
    },
    {
        label: "Floor price",
        value: "-",
    },
    {
        label: "Total sales",
        value: "-",
    },
];

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
    const [sorting, setSorting] = useState<string>("nfts");
    const [theme, setTheme] = useState<boolean>(false);

    const tabs = [
        {
            title: "NFTs",
            value: "nfts",
            counter: "35",
        },
        {
            title: "Activity",
            value: "activity",
            counter: "5",
            onClick: () => setTheme(false),
        },
        {
            title: "Owners",
            value: "owners",
            counter: "16",
            onClick: () => setTheme(false),
        },
    ];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.photo}>
                    <Image
                        src="/images/cute-planet-1.png"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <DetailsCollection details={detailsList} />
            </div>
            <div className={styles.col}>
                <List
                    tabs={tabs}
                    tabsValue={sorting}
                    setTabsValue={setSorting}
                    light={theme}
                >
                    {sorting === "nfts" && (
                        <Tokens
                            titleUsers="Owned by"
                            items={nfts}
                            users={["/images/artists/artist-1.jpg"]}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    )}
                    {sorting === "activity" && <Activity items={activity} />}
                    {sorting === "owners" && <Owners items={followers} />}
                    <div className={styles.foot}>
                        <Link href="/article">
                            <a className={styles.link}>How to mint an NFT?</a>
                        </Link>
                    </div>
                </List>
            </div>
        </div>
    );
};

export default Profile;
