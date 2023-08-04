import cn from "classnames";
import styles from "./Statistics.module.sass";
import Image from "@/components/Image";
import truncateEthAddress from "truncate-eth-address";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type StatisticsProps = {
  className?: string;
  items: any;
};

const Statistics = ({ className, items }: StatisticsProps) => {
  const statistics = [
    {
      label: "Owned by",
      avatar: "/images/avatar.jpg",
      history: true,
      title: items?.owner?.username,
      login: items?.owner?.walletAddress
        ? truncateEthAddress(items?.owner?.walletAddress)
        : "",
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
              {items?.owner?.walletAddress ? (
                <Jazzicon
                  diameter={35}
                  seed={jsNumberForAddress(items?.owner?.walletAddress)}
                />
              ) : null}

              {/* <div
                className={cn({
                  [styles.avatar]: item.avatar,
                  [styles.image]: item.image,
                  [styles.history]: item.history,
                })}
              >
                
              </div> */}
              <div className={styles.details} style={{ marginLeft: "8px" }}>
                <div className={styles.title}>{item.title}</div>
                {item.login && <div className={styles.login}>{item.login}</div>}
                {/* {items.category && (
                  <div className={styles.category}>
                    {items.tags.map((tag: any) => (<div> {tag.name}</div>))}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
