import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";

type TokenProps = {
    className?: string;
    item: any;
    large?: boolean;
    dark?: boolean;
};

const Token = ({ className, item, large, dark }: TokenProps) => (
    <Link href={item.url}>
        <a
            className={cn(
                styles.token,
                { [styles.large]: large, [styles.dark]: dark },
                className
            )}
        >
            <div className={styles.preview}>
                <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Token"
                />
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.category}>Buy now</div>
                <div className={styles.line}>
                    <div className={styles.price}>{item.price}</div>
                    <Users items={item.users} />
                </div>
            </div>
        </a>
    </Link>
);

export default Token;
