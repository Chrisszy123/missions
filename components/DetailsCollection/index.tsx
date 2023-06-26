import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import Icon from "@/components/Icon";
import Link from "next/link";

type DetailsType = {
  name: string;
  desc: string;
  secondaryLink: string;
  link: string;
  tags: string[];
};

type DetailsProps = {
  details: DetailsType[];
};

const Details = ({ details }: DetailsProps) => {
  return (
    <div className={styles.details}>
      {details.map((item, key) => (
        <>
          <div className={styles.head}>
            <div className={styles.box}>
              <div className={cn("h2", styles.user)}>{item.name}</div>
              <div className={styles.line}>
                <div className={styles.category}>{item.tags[0]}</div>
                <div className={styles.code}>
                  {item.link}
                  <button className={styles.copy}>
                    <Icon name="copy" />
                  </button>
                </div>
              </div>
            </div>
            
              <button
                className={cn(
                  "button-stroke-grey button-medium",
                  styles.button
                )}
              >
                <Link href="/communities/edit">
                <span>edit</span>
                </Link>
                <Icon name="edit" />
              </button>
        
          </div>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.label}>
                <Icon name="profile-fat" />
              </div>
              <div className={cn("h4", styles.value)}></div>
            </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.stage}>Description</div>
            <div className={styles.content}>{item.desc}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Details;
