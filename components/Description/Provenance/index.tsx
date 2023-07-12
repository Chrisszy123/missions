import cn from "classnames";
import styles from "./Provenance.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import truncateEthAddress from "truncate-eth-address";

type ProvenanceProps = {
  action?: any;
  items: any;
};

const Provenance = ({ action, items }: ProvenanceProps) => {
  console.log(items);
  return (
    <div className={styles.provenance}>
      {action && (
        <div className={styles.action}>
          <div
            className={cn(styles.avatar, {
              [styles.history]: action.history,
            })}
          >
            {/* <Image
              src={action.avatar}
              layout="fill"
              objectFit="cover"
              alt="Avatar"
            /> */}
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
             <Jazzicon
                diameter={40}
                seed={jsNumberForAddress(
                  item?.users[0]?.walletAddress
                )}
              /> 
            {/* <div
              className={cn(styles.avatar, {
                [styles.history]: item.history,
              })}
            >
             
            </div> */}
            <div className={styles.details} style={{marginLeft: '8px'}}>
              <div className={styles.content}>{truncateEthAddress(item?.users[0]?.walletAddress)}</div>
              <div className={styles.date}>{item?.createdAt.slice(0, 10)}</div>
            </div>
            {item.price && <div className={styles.price}>pending</div>}
            <a
              className={styles.link}
              href="#"
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
};

export default Provenance;
