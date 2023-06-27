import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";

type CardProps = {
    className?: string;
    item: any;
};

const Card = ({ className, item }: CardProps) => (
    <Link href={`missions/${item.id}`}>
        <a className={cn(styles.card, className)}>
            <div className={styles.preview}>
                <Image
                    src="/images/projects/image-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="missionlogo"
                />
            </div>
            <div className={styles.line}>
                <div className={styles.details}>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.price}>
                        <span>Enter</span> {item.rewards}
                    </div>
                </div>
                {/* <Users className={styles.users} items={item.users} /> */}
            </div>
        </a>
    </Link>
);

export default Card;
