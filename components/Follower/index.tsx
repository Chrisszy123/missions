import Link from "next/link";
import cn from "classnames";
import styles from "./Follower.module.sass";
import Image from "@/components/Image";
import Follow from "@/components/Follow";
import truncateEthAddress from "truncate-eth-address";

type FollowerProps = {
    item: any;
};

const Follower = ({ item }: FollowerProps) => {
    return (
        <div className={styles.follower}>
            <Link href="#">
                <a className={styles.user}>
                    <div
                        className={cn(styles.avatar, {
                            [styles.history]: item.history,
                        })}
                    >
                        <Image
                            src="/images/artists/artist-1.jpg"
                            layout="fill"
                            objectFit="cover"
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.name}>{truncateEthAddress(item?.walletAddress)}</div>
                        <div className={styles.login}>@{item?.username ? item?.username: "newuser"}</div>
                    </div>
                </a>
            </Link>
            <div className={styles.follow}>
                <div className={styles.text}>Completed</div>
                <div className={styles.crypto}>10</div>
            </div>
            {/* <Follow className={styles.follow} value={item.follow} /> */}
        </div>
    );
};

export default Follower;
