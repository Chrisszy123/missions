import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => {
  const { commName, commDesc, commLink, commImage }: any =
    useContext(AuthContext);
  return (
    <>
      <div className={styles.title}>Preview</div>
      <div className={styles.preview} style={{padding: '0'}}>
        <Image
          src={commImage !== "" ? `${commImage}` : "/images/gray.jpg"}
          layout="fill"
        />
        <div
          className={styles.image}
          style={{ padding: "8px",fontSize: '14px',  overflow: "hidden", textOverflow: "ellipsis", width: "45%" }}
        >
          URL: {commLink}
        </div>
        <div
          className={styles.category}
          style={{
            fontSize: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "50%",
            padding: "8px",
          }}
        >
          Name: {commName}{" "}
        </div>
        <div
          className={styles.head}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "8px",
            height: "50px",
            fontSize: '12px'
          }}
        >
          Description: {commDesc}
        </div>
      </div>
      {/* <div
        className={styles.head}
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <div
          className={cn("h4", styles.subtitle)}
          style={{ fontSize: "20px" }}
        ></div>
        <div className={styles.price} style={{ color: "gray" }}>
          {commName} <br />
          <br />
          <div
            style={{
              overflow: "hidden",
              width: "100px",
              height: "40px",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Preview;

{
  /*  */
}
