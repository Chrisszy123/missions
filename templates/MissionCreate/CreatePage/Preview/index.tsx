import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => {
  const { missionName, missionRewards, mDesc }: any = useContext(AuthContext);
  return (
    <>
      <div className={styles.title}>Preview</div>
      <div className={styles.preview} style={{padding: '1rem'}}>
        <div className={styles.image} style={{color: '#000'}}> Rewards: {missionRewards}</div>
        <div className={styles.category}>Name: {missionName}</div>
        <div
          className={cn("h4", styles.subtitle)}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "8px",
            height: "50px",
            fontSize: "20px",
          }}
        > Description: 
          {mDesc}
        </div>
      </div>
      <div className={styles.head}>
        <div className={styles.price} ></div>
      </div>
    </>
  );
};

export default Preview;
