import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import Field from "@/components/Field";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import { useState } from "react";

type DetailsProps = {
  mission: any;
};

const Details = ({ mission }: DetailsProps) => {
  const [toggleSubmit, setToggleSubmit] = useState(false);
  return (
    <div className={styles.details}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.label}>Reward</div>
          <div className={cn("h4", styles.value)}>{mission[0].rewards[0]}</div>
          <Link href="#">
            <a
              className={cn("button-medium button-wide", styles.button)}
              onClick={() => setToggleSubmit(!toggleSubmit)}
            >
              ENTER
            </a>
          </Link>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>State</div>
          <div className={cn("h4", styles.value)}>{mission[0].state}</div>
          <Link href="#">
            <a
              className={cn(
                "button-stroke-grey button-medium button-wide",
                styles.button
              )}
            >
              Join
            </a>
          </Link>
        </div>
      </div>
      {toggleSubmit ? (
        <div className={styles.foot}>
          <Field
            className={style.field}
            placeholder="Enter Answer"
            type="text"
            onChange={(e: any) => {}}
            large
            required
            textarea
          />
          <Link href="/make-offer">
            <a
              className={cn("button-stroke-grey button-medium", styles.button)}
            >
              submit
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
