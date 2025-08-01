import { useState } from "react";
import cn from "classnames";
import styles from "./Spotlight.module.sass";
import Tabs from "@/components/Tabs";
import Card from "./Card";
import { tabs } from "@/mocks/spotlight";

type SpotlightProps = {
  missions: any
};

const Spotlight = ({missions}: SpotlightProps) => {
  const [sorting, setSorting] = useState<string>("1-days");
  return (
    <>
      {missions?.length === 0 ? (
        <>loading ...</>
      ) : (
        <div className={styles.spotlight}>
          <div className={styles.head}>
            <div className={styles.details}>
              <div className={cn("h1", styles.title)}>Missions.</div>
              <div className={styles.info}>Missions you&apos;ll love</div>
            </div>
            <Tabs
              className={styles.tabs}
              items={tabs}
              value={sorting}
              setValue={setSorting}
              dark
            />
          </div>
          <div className={styles.list}>
            {missions?.map((card: any, index: any) => (
              <Card className={styles.card} item={card} key={index} />
            ))}
          </div>
          <div className={styles.btns}>
            <button
              className={cn("button-white button-counter", styles.button)}
            >
              explorer more
              <span>109</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Spotlight;
