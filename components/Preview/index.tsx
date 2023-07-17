import cn from "classnames";
import Image from "@/components/Image";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

type PreviewProps = {
  imageUrl: string | null;
  name: string;
  desc: string;
};

const Preview = ({ imageUrl, name, desc }: PreviewProps) => {
  return (
    <div className="w-full">
      <div>
        <div className="relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl !== null ? `${imageUrl}` : "/images/gray.jpg"}
              layout="fill"
              priority={true}
              objectFit="cover"
              className="rounded-lg h-80 w-full"
            />
          </div>
          <div className="absolute inset-x-0 top-0 flex flex-col h-80 items-start justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black opacity-80"
            />
            <p className="relative text-xl font-extrabold text-white">{name}</p>
            <p className="relative text-sm font-thin text-white">{desc}</p>
          </div>
        </div>
      </div>

      {/*   <div className={styles.preview} style={{ padding: "1rem" }}>
        <Image
          src={imageUrl !== null ? `${imageUrl}` : "/images/gray.jpg"}
          layout="fill"
          priority={true}
        />
        <div className="relative z-10 bg-white text-indigo-500">
          Name: {commName}
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
            fontSize: "12px",
          }}
        >
          Description: {commDesc}
        </div>
      </div> */}
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
    </div>
  );
};
export default Preview;
