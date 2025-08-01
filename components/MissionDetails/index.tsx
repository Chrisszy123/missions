import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import Field from "@/components/Field";
import style from "./CreateStep1Page.module.sass";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { WalletContext } from "context/WalletContext";

type DetailsProps = {
  mission: any;
};

const Details = ({ mission }: DetailsProps) => {
  const { account }: any = useContext(WalletContext);
  const filteredUser = mission?.users.filter((user: any) => user.walletAddress === account.toString().toLowerCase());
  return (
    <div className={styles.details}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.label}>Reward</div>
          <div className={cn("h4", styles.value)}>{mission.rewards[0]}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>State</div>
          <div className={cn("h4", styles.value)}>{mission.state}</div>
        </div>
      </div>
      {filteredUser?.length !== 0 ? (
        <div className={styles.foot} style={{ flexDirection: "column" }}>
          <Field
            className={style.field}
            placeholder="Enter Answer"
            type="text"
            onChange={(e: any) => {}}
            large
            required
            textarea
            style="100%"
          />
          {mission?.state !== "OPEN" ? (
            <div> can only submit open mission</div>
          ) : (
            <Link href="#">
              <a
                className={cn(
                  "button-stroke-grey button-medium",
                  styles.button
                )}
              >
                submit
              </a>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Details;
