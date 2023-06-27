import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";

type DetailsProps = {
    mission: any
};

const Details = ({mission}: DetailsProps) => (
    <div className={styles.details}>
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.label}>Reward</div>
                <div className={cn("h4", styles.value)}>{mission[0].rewards[0]}</div>
                <Link href="#">
                    <a
                        className={cn(
                            "button-medium button-wide",
                            styles.button
                        )}
                    >
                       ENTER
                    </a>
                </Link>
            </div>
            <div className={styles.col}>
                <div className={styles.label}>State</div>
                <div className={cn("h4", styles.value)}>{mission[0].state}</div>
                <Link href="#">
                    <a
                        className={cn(
                            "button-stroke-grey button-medium button-wide",
                            styles.button
                        )}
                    >
                        Join
                    </a>
                </Link>
            </div>
        </div>
        {/* <div className={styles.foot}>
            <div className={styles.box}>
                <div className={styles.label}>Last sold</div>
                <div className={cn("h4", styles.value)}>6.05 ETH</div>
            </div>
            <div className={styles.user}>
                <div className={cn(styles.avatar, styles.history)}>
                    <Image
                        src="/images/avatar.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.author}>Dash</div>
                    <div className={styles.code}>0x56C1...8eCC</div>
                </div>
            </div>
            <Link href="/make-offer">
                <a
                    className={cn(
                        "button-stroke-grey button-medium",
                        styles.button
                    )}
                >
                    make offer
                </a>
            </Link>
        </div> */}
    </div>
);

export default Details;
