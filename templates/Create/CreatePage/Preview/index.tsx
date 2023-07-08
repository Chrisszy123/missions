import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

type PreviewProps = {};

const Preview = ({}: PreviewProps) => {
    const {commName, commDesc, commLink, commImage}: any = useContext(AuthContext)
  return (
    <>
      <div className={styles.title}>Preview</div>
      <div className={styles.preview}>
        <Image src={commImage !== '' ? `${commImage}` : "/images/nfts/image-1.jpg"} layout='fill' />
        <div className={styles.image}> </div>
        <div className={styles.category}></div>
      </div>
      <div className={styles.head}>
        <div className={cn("h4", styles.subtitle)} style={{fontSize: '20px'}}> 
            Community Name: <br />
            Link:  <br />
            Description: 
        </div>
        <div className={styles.price} style={{color: 'gray'}}>
            {commName} <br />
            {commLink} <br />
            <div style={{overflow: 'hidden', width: '100px', height: '40px', textOverflow: 'ellipsis'}}> {commDesc}</div>
        </div>
      </div>
    </>
  );
};
export default Preview;

{/*  */}