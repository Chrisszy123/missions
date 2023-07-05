import cn from "classnames";
import styles from "./Statistics.module.sass";
import Image from "@/components/Image";
import truncateEthAddress from 'truncate-eth-address'

type StatisticsProps = {
  className?: string;
  items: any;
};


const Statistics = ({ className, items }: StatisticsProps) => {
    console.log(items)
    const statistics = [
        {
          label: "Owned by",
          avatar: "/images/avatar.jpg",
          history: true,
          title: items.user[0].name,
          login: truncateEthAddress(items.user[0].walletAddress)
        },
        {
          label: "Community",
          image: "/images/robot.jpg",
          title: "Category",
          category: items.tags[0].name,
        },
      ];
  return (
    <div
      className={cn(styles.statistics, className)}
      style={{ padding: "0rem", paddingTop: "1rem" }}
    >
      <div className={styles.list}>
        {statistics.map((item: any, index: number) => (
          <div className={styles.item} key={index}>
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
                  <div className={styles.login}>{item.login}</div>
                )}
                {item.category && (
                  <div className={styles.category}>{item.category}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
