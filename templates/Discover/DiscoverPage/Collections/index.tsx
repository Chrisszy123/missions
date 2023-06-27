import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Collections.module.sass";
import style from "@/components/Catalog/Catalog.module.sass";
import Tabs from "@/components/Tabs";
import Collection from "./Collection";
import { getMissions } from "@/utils/axios";

type CollectionsProps = {
  scrollToRef: any;
};

const Collections = ({ scrollToRef }: CollectionsProps) => {
  const [missions, setMissions] = useState<any>([]);
  const [sorting, setSorting] = useState<string>("1-days");
  useEffect(() => {
    getMissions().then((res) => {
      setMissions(res.data);
      console.log(res.data);
    });
  }, []);
  const tabs = [
    {
      title: "1 days",
      value: "1-days",
    },
    {
      title: "7 days",
      value: "7-days",
    },
    {
      title: "30 days",
      value: "30-days",
    },
  ];

  return (
    <div className={styles.collections} ref={scrollToRef}>
      {missions ? (
        <>
          <div className={styles.head}>
            <div className={cn("h1", styles.title)}>Missions</div>
            <Tabs
              className={styles.tabs}
              items={tabs}
              value={sorting}
              setValue={setSorting}
            />
          </div>
          <div className={styles.list}>
            {missions.map((mission: any, index: any) => (
              <Collection className={style.card} item={mission} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div> missions loading ...</div>
      )}
    </div>
  );
};

export default Collections;
