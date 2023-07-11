import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";

type CardProps = {
    className?: string;
    item: any;
    dark?: any;
};

const Card = ({ className, item, dark }: CardProps) => {
return (
    <Link href={`/communities/${item.id}`}>
        <a className={cn(styles.card, { [styles.dark]: dark }, className)}>
        <div className={styles.user}>
                {/* <div className={styles.avatar}>
                    <Image
                        src="/images/artists/artist-1.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div> */}
                <div className={styles.login} style={{textTransform: 'uppercase'}}>{item.name}</div>
                {item.verified && (
                    <div className={styles.verified}>
                        <Image
                            src="/images/verified.png"
                            width={100}
                            height={100}
                            alt="Verified"
                        />
                    </div>
                )}
            </div>
            <div className={styles.preview} style={{marginBottom: '2px'}}>
                <Image
                    className={styles.photo}
                    src={item?.image ? `${item?.image}`:"/images/nfts/image-1.jpg"}
                    layout="fill"
                    objectFit="cover"
                    alt="Card"
                />
                <div className={styles.category}>
                    <div className={styles.image}>
                        <Image
                            src={item?.image ? `${item?.image}`:"/images/collection/image-6.jpg"}
                            layout="fill"
                            objectFit="cover"
                            alt="Photo category"
                        />
                    </div>
                    {item.category}
                </div>
                <div className={styles.title}>{item.title}</div>
            </div>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <Image
                        src="/images/artists/artist-1.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.login} style={{fontSize: '14px'}}>{item.desc}</div>
                {item.verified && (
                    <div className={styles.verified}>
                        <Image
                            src={"/images/verified.png"}
                            width={100}
                            height={100}
                            alt="Verified"
                        />
                    </div>
                )}
            </div>
            <div className={styles.foot}>
                <div className={styles.box}>
                    <div className={styles.text}>Link</div>
                    <div className={styles.price} style={{fontSize: "10px", textOverflow: 'ellipsis'}}>{item.link}</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.text}></div>
                    <div className={styles.price} style={{fontSize: "10px", textOverflow: 'ellipsis'}}>{item.secondaryLink}</div>
                </div>
            </div>
        </a>
    </Link>
)
                };

export default Card;
