import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./Description.module.sass";
import sty from "@/components/Description/Description.module.sass";
import Icon from "@/components/Icon";
import Preview from "./Preview";
import Statistics from "./Statistics";
import Caption from "./Caption";
import Links from "./Links";
import Tags from "./Tags";
import Provenance from "./Provenance";
import { Dispatch, SetStateAction } from "react";

type DescriptionProps = {
  exit?: boolean;
  image: string;
  statistics: any;
  content: any;
  links?: any;
  addTags?: boolean;
  tags?: any;
  provenanceAction?: any;
  provenance?: any;
  captionHide?: boolean;
  title: string;
  date: string;
  children: React.ReactNode;
  missionData?: any;
  setDeleted?:   Dispatch<SetStateAction<boolean>> | any;
};

const Description = ({
  exit,
  image,
  statistics,
  content,
  links,
  addTags,
  tags,
  provenanceAction,
  provenance,
  captionHide,
  title,
  date,
  children,
  missionData,
  setDeleted
}: DescriptionProps) => {
  const router = useRouter();

  return (
    <>
      {exit && (
        <div className={styles.top}>
          <button className={styles.exit} onClick={() => router.back()}>
            <Icon name="close-fat" />
            <span>Exit preview mode</span>
          </button>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.col}>
          <Preview image={image} alt={title} />

          <div
            className={sty.box}
          >
            <div className={cn("h4", sty.stage)}>Description</div>
            <div className={sty.content} style={{ fontSize: "14px" }}>
              {provenance?.desc}
            </div>
          </div>


          <Statistics className={styles.box} items={statistics} />
          {/* <div className={styles.box}>
                        <div className={cn("h4", styles.stage)}>Details</div>
                        <div className={styles.content}>{content}</div>
                        {links && <Links items={links} />}
                        {addTags && (
                            <button
                                className={cn(
                                    "button-stroke-grey button-medium",
                                    styles.button
                                )}
                            >
                                <span>Add tags</span>
                                <Icon name="plus" />
                            </button>
                        )}
                        {tags && <Tags tags={tags} />}
                    </div> */}
          {provenance && (
            <div className={styles.box}>
              <div className={cn("h4", styles.stage)}>Users</div>
              <Provenance action={provenanceAction} items={provenance} />
            </div>
          )}
        </div>
        <div className={styles.col}>
          <div className={styles.wrap}>
            {!captionHide && (
              <Caption title={title} date={date} data={missionData} setDeleted={setDeleted}/>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
