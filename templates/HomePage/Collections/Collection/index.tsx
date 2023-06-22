import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => (
    <Link href={item.url}>
        <a className={styles.collection}>
            <div className={styles.images}>
                {item.images.slice(0, 3).map((image: any, index: number) => (
                    <div className={styles.image} key={index}>
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt="Collection item"
                        />
                    </div>
                ))}
                <div
                    className={styles.counter}
                    style={{
                        backgroundColor: item.color,
                    }}
                >
                    +{item.images.length - 3}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.box}>
                    <div className={styles.subtitle}>{item.title}</div>
                    <div className={styles.author}>
                        <div className={styles.avatar}>
                            <Image
                                src={item.avatar}
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div>
                        @{item.login}
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.text}>Floor price</div>
                    <div className={styles.price}>{item.price}</div>
                </div>
            </div>
        </a>
    </Link>
);

export default Collection;
