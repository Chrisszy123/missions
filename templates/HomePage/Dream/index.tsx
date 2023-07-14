import Link from "next/link";
import cn from "classnames";
import styles from "./Dream.module.sass";
import Image from "@/components/Image";

type DreamProps = {};

const Dream = ({}: DreamProps) => (
    <div className={styles.dream}>
        <div className={styles.wrap}>
            <div className={styles.details}>
                <div className={styles.item}>
                    <div className={styles.avatar}>
                        <Image
                            src="/images/01nodelogo.svg"
                            layout="fill"
                            objectFit="contain"
                            alt="Avatar"
                        />
                    </div>
                    01 Node
                </div>
            </div>
            <div className={cn("h1", styles.title)}>Trailblazing Explorers</div>
            <div className={styles.line}>
                <div className={styles.box}>
                    <div className={styles.text}>Rewards</div>
                    <div className={cn("h3", styles.crypto)}>1 NFT</div>
                    <div className={styles.price}>01Node POAP NFT</div>
                </div>
                <Link href="/make-offer">
                    <a className={cn("button-white", styles.button)}>
                        ENTER MISSION
                    </a>
                </Link>
            </div>
        </div>
        <div className={styles.preview}>
            <Image
                src="/images/header.jpeg"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                alt="Avatar"
            />
        </div>
    </div>
);

export default Dream;
