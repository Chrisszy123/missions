import cn from "classnames";
import styles from "./Provenance.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type ProvenanceProps = {
    action?: any;
    items: any;
};

const Provenance = ({ action, items }: ProvenanceProps) => (
    <div className={styles.provenance}>
        {action && (
            <div className={styles.action}>
                <div
                    className={cn(styles.avatar, {
                        [styles.history]: action.history,
                    })}
                >
                    <Image
                        src={action.avatar}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                <div className={styles.content}>{action.content}</div>
                <div className={cn("h4", styles.title)}>{action.title}</div>
                <div className={styles.date}>{action.date}</div>
                <a
                    className={styles.link}
                    href={action.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {action.linkTitle}
                    <Icon name="external-link" />
                </a>
            </div>
        )}
        <div className={styles.list}>
            {items.map((item: any, index: number) => (
                <div className={styles.item} key={index}>
                    <div
                        className={cn(styles.avatar, {
                            [styles.history]: item.history,
                        })}
                    >
                        <Image
                            src={item.avatar}
                            layout="fill"
                            objectFit="cover"
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.content}>{item.content}</div>
                        <div className={styles.date}>{item.date}</div>
                    </div>
                    {item.price && (
                        <div className={styles.price}>{item.price}</div>
                    )}
                    <a
                        className={styles.link}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="external-link" />
                    </a>
                </div>
            ))}
        </div>
    </div>
);

export default Provenance;
