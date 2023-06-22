import Link from "next/link";
import styles from "./Item.module.sass";
import Image from "@/components/Image";

type ItemProps = {
    item: any;
    number: number;
};

const Item = ({ item, number }: ItemProps) => (
    <Link href={item.url}>
        <a className={styles.item}>
            <div className={styles.number}>
                <div className={styles.inner}>{number + 1}</div>
            </div>
            <div className={styles.avatar}>
                <Image
                    src={item.avatar}
                    layout="fill"
                    objectFit="cover"
                    alt="Avatar"
                />
            </div>
            <div className={styles.login}>@{item.login}</div>
            <div className={styles.total}>
                Total sale <span>{item.total}</span>
            </div>
        </a>
    </Link>
);

export default Item;
