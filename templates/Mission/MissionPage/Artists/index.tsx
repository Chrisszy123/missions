import Link from "next/link";
import cn from "classnames";
import styles from "./Artists.module.sass";
import Icon from "@/components/Icon";
import Artist from "./Artist";

import { artists } from "@/mocks/artists";

type ArtistsProps = {
    scrollToRef: any;
};

const Artists = ({ scrollToRef }: ArtistsProps) => (
    <div className={styles.row} ref={scrollToRef}>
        <div className={styles.col}>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <div className={cn("h1", styles.title)}>
                        Hot NFT artists of the month.
                    </div>
                    <Link href="/discover/ranking">
                        <a className={styles.link}>
                            <Icon name="arrow-right" />
                        </a>
                    </Link>
                </div>
                <div className={styles.content}>
                    We are laying the groundwork for web3 — the next generation
                    of the internet full of limitless possibilities. Join the
                    millions of creators, collectors, and curators who are on
                    this journey with you.
                </div>
            </div>
        </div>
        <div className={styles.col}>
            <div className={styles.artists}>
                {artists.map((artist, index) => (
                    <Artist item={artist} key={index} />
                ))}
            </div>
            <button className={cn("button-wide", styles.button)}>
                LOAD MORE
            </button>
        </div>
    </div>
);

export default Artists;
