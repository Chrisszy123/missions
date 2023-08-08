import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";
import Icon from "../Icon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { approveMission } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "context/AuthContext";

type TokenProps = {
  className?: string;
  item: any;
  large?: boolean;
  dark?: boolean;
  owner?: string;
};

const Token = ({ className, item, large, dark, owner }: TokenProps) => {
  const [approveLaoding, setApproveLaoding] = useState("idle");
  const [error, setError] = useState(false);
  const { user }: any = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  //approve
  const ApproveMission = () => {
    console.log("approve");
    setApproveLaoding("loading");
    approveMission(item?.id, item?.state)
      .then((m) => {
        setApproveLaoding("success");
      })
      .catch((e) => setError(true));
  };
  // close
  const closeMission = () => {
    console.log("close");
  };
  const showMissionAnswers = () => {
    console.log("answer");
  };
  const MyOptions = [
    item?.state === "PENDING"
      ? { title: "Approve mission", action: () => ApproveMission() }
      : null,
    item?.state !== "CLOSED"
      ? { title: "close mission", action: () => closeMission() }
      : null,
    { title: "See Answers", action: () => showMissionAnswers() },
  ];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={cn(
        styles.token,
        { [styles.large]: large, [styles.dark]: dark },
        className
      )}
    >
      <Link href={`${item.communityId}/missions/${item.id}`}>
        <div className={cn(styles.preview, "cursor-pointer")}>
          <Image
            src={item?.image ? item?.image : "/images/nfts/image-1.jpg"}
            layout="fill"
            objectFit="cover"
            alt="Token"
          />
        </div>
      </Link>
      <div className={styles.details}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.category}>Enter</div>
        <div className={styles.line}>
          <div className={styles.price}>{item.rewards[0]}</div>
          <div
            className={cn(
              "flex justify-center items-center font-[1rem] font-semibold text-gray-500"
            )}
          >
            {item.state}
            {owner === user?.message?.data?.id ? (
              <>
                <IconButton
                  style={{ color: "rgb(107 114 128)", padding: "2px" }}
                  aria-label="more"
                  onClick={handleClick}
                  aria-haspopup="true"
                  aria-controls="long-menu"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  onClose={handleClose}
                  open={open}
                >
                  {MyOptions.map((option, index) => (
                    <MenuItem key={index} onClick={() => option?.action()}>
                      {option?.title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : null}
          </div>
          {/* <Users items={item.users} /> */}
        </div>
      </div>
    </div>
  );
};

export default Token;
