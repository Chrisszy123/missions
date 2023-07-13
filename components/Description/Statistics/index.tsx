import cn from "classnames";
import styles from "./Statistics.module.sass";
import Image from "@/components/Image";
import Link from "next/link";

type StatisticsProps = {
  className?: string;
  items: any;
};

const Statistics = ({ className, items }: StatisticsProps) => {
  console.log(items);
  return (
    <div className={cn(styles.statistics, className)}>
      <div className={styles.list}>
        {items.map((item: any, index: number) => (
          <Link href={item.link} key={index}>
            <div className={styles.item} style={{cursor: "pointer"}}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.flex}>
                <div
                  className={cn({
                    [styles.avatar]: item.avatar,
                    [styles.image]: item.image,
                    [styles.history]: item.history,
                  })}
                >
                  <Image
                    src={item.avatar || item.image}
                    layout="fill"
                    objectFit="cover"
                    alt={item.title}
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{item.title}</div>
                  {item.login && (
                    <div className={styles.login}>@{item.login}</div>
                  )}
                  {item?.category &&
                    item?.category.map((c: any) => (
                      <div
                        className={styles.category}
                        style={{ marginLeft: "4px" }}
                      >
                        {c}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
