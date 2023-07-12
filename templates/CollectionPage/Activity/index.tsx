import styles from "./Activity.module.sass";
import Image from "@/components/Image";
import truncateEthAddress from "truncate-eth-address";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type ItemsType = {
  nft: string;
  fromAvatar: string;
  fromLogin: string;
  username: string;
  walletAddress: string;
  level: string;
};

type ActivityProps = {
  items: ItemsType[];
};

const Activity = ({ items }: ActivityProps) => (
  <div className={styles.table}>
    <div className={styles.row}>
      <div className={styles.col}>Profile</div>
      <div className={styles.col}>Username</div>
      <div className={styles.col}>Address</div>
      <div className={styles.col}>Rank</div>
    </div>
    {items.map((item, index) => (
      <div className={styles.row} key={index}>
        <div className={styles.col}>
          <div className={styles.preview}>
            <Jazzicon
              diameter={60}
              seed={jsNumberForAddress(item?.walletAddress)}
            />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.login} style={{ paddingLeft: "0px" }}>
            @{item?.username ? item?.username : "newuser"}
          </div>
          {/* <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/nfts/image-6.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="NFT"
                            />
                        </div>
                        
                    </div> */}
        </div>
        <div className={styles.col}>
          <div className={styles.login} style={{ paddingLeft: "0px" }}>
            {truncateEthAddress(item?.walletAddress)}
          </div>
          {/* <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/nfts/image-6.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="NFT"
                            />
                        </div>
                       
                    </div> */}
        </div>
        <div className={styles.col}>{item?.level}</div>
      </div>
    ))}
  </div>
);

export default Activity;
