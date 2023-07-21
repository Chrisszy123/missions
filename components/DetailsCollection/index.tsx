import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import styled from "@/components/Description/Description.module.sass";
import sty from "@/components/Description/Description.module.sass";
import Statistics from "./Statistics";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import Preview from "@/components/Preview";
import LayoutCreate from "@/components/LayoutCreate";
import Field from "@/components/Field";
import { AuthContext } from "context/AuthContext";
import { WalletContext } from "context/WalletContext";
import Links from "./Links";
import Tags from "./Tags";

import {updateCommunity, getOneUser, joinCommunity, leaveCommunity } from "@/utils/axios";

type DetailsType = {
  name: string;
  desc: string;
  secondaryLink: string;
  link: string;
  tags: string[];
};

type DetailsProps = {
  details: DetailsType[];
};

const Details = ({ details }: any) => {
  const creator = details?.ownerId;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<any>([]);
  const [link, setLink] = useState<string>("");
  const [uniqueTags, setUniqueTags] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<any>(false);
  const [isMember, setIsMember] = useState<any>(false);

  const [userId, setUserId] = useState<any>();

  // const { user }: any = useContext(AuthContext);
  const { connected, account }: any = useContext(WalletContext);
  //const useremail = user?.email;
  const router = useRouter();
  const communityId = router.query.Id;
  const walletAddress = account?.toString().toLowerCase();
  //check if user is already a memeber
  useMemo(() => {
    details?.users.filter((e: any) => {
      if(e?.id === userId){
        setIsMember(true)
      }
    })
  }, [userId])
  getOneUser(walletAddress).then((e: any) => {
    setUserId(e?.message?.data?.id);
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const communityData = {
        name: name,
        tags: tags,
        link: link,
        desc: desc,
        //userId: userId, get userId via walletAddress
        id: communityId,
      };
      const comm = await updateCommunity(communityData);
      //use data to redirect
      if (comm?.status !== true) {
        setError(true);
      } else {
        router.push(`/communities/${communityId}`);
      }
    } catch (err: any) {
      throw new Error("errors submitting community data" + err);
    }
  };
  const handleJoin = async () => { 
    try{
      const data = {
        id: communityId,
        userId
      }
      const join = await joinCommunity(data)
      if(join.status === true){
        router.reload()
      }
    }catch(err: any){
      throw new Error("error joining community"+ err )
    }
   
  }
  const handleLeave = async () => { 
    try{ 
      const data = {
        id: communityId,
        userId
      }
      const leave = await leaveCommunity(data)
      if(leave.status === true){
        router.reload()
      }
    }catch(err: any){
      throw new Error("error leaving community"+ err )
    }
   
  }
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.details}>
      <div className={styles.head}>
        <div className={styles.box}>
          <div className={cn("h2", styles.user)} style={{ fontSize: "30px" }}>
            {details?.name}
          </div>
          <div className={styles.line}>
            <div className={styles.code}>
              {details?.link}
              <button className={styles.copy}>
                <Icon name="copy" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {creator !== userId ? (
            <></>
          ) : (
            <button
              className={cn("button-stroke-grey button-medium", styles.button)}
              onClick={openModal}
              style={{
                paddingLeft: "0.5rem",
                paddingRight: "0.6rem",
                marginLeft: "0px",
              }}
            >
              <Icon name="edit" />
            </button>
          )}
          {connected ? (
            <>
              {isMember ? (
                <button
                className={cn(
                  "button-stroke-grey button-medium",
                  styles.button
                )}
                onClick={handleLeave}
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "0.6rem",
                  marginLeft: "0px",
                }}
              >
                <Icon name="logout" />
              </button>
              ) : (
                <button
                  className={cn(
                    "button-stroke-grey button-medium",
                    styles.button
                  )}
                  onClick={handleJoin}
                  style={{
                    paddingLeft: "0.5rem",
                    paddingRight: "0.6rem",
                    marginLeft: "0px",
                  }}
                >
                  <Icon name="plus" />
                </button>
              )}
            </>
          ) : null}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              zIndex: "100",
            },
          }}
        >
          <button onClick={closeModal}>
            <a className={cn("button-circle", style.back)}>
              <Icon name="arrow-left" />
            </a>
          </button>
          <LayoutCreate
            left={
              <>
                <div className={style.head}>
                  <div className={cn("h1", style.title)}>
                    Edit <br></br>Community.
                  </div>
                </div>
                <div className={style.info}>Edit Community</div>
                <form
                  className={style.form}
                  action=""
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Field
                    className={style.field}
                    placeholder="Community name"
                    icon="profile"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    large
                    required
                  />
                  <Field
                    className={style.field}
                    placeholder="Community Link"
                    icon="profile"
                    value={link}
                    onChange={(e: any) => setLink(e.target.value)}
                    large
                    required
                  />
                  <Field
                    className={style.field}
                    placeholder="Community Tags"
                    icon="profile"
                    value={tags}
                    onChange={(e: any) => setTags([...tags, e.target.value])}
                    large
                    required
                  />
                  <Field
                    className={style.field}
                    placeholder="Community Desc"
                    icon="email"
                    type="text"
                    value={desc}
                    onChange={(e: any) => setDesc(e.target.value)}
                    large
                    required
                  />
                  <button type="submit">
                    <a className={cn("button-large", style.button)}>
                      <span>Continue</span>
                      <Icon name="arrow-right" />
                    </a>
                  </button>

                  {error ? (
                    <div style={{ color: "red" }}>Error creating Community</div>
                  ) : (
                    ""
                  )}
                </form>
              </>
            }
          >
            <Preview imageUrl="/"/>
          </LayoutCreate>
        </Modal>
      </div>
      <div className={styles.list} style={{ marginBottom: "1rem" }}>
        <div className={styles.item}>
          <div className={styles.label}>
            <Icon name="profile-fat" /> Users
          </div>
          <div className={cn("h4", styles.value)}>{details?.users.length}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <Icon name="profile-fat" /> Missions
          </div>
          <div className={cn("h4", styles.value)}>
            {details?.missions?.length}
          </div>
        </div>
      </div>
      <Statistics items={details} className={styled.box} />
      <div
        className={sty.box}
        style={{ padding: "0", paddingTop: "1rem", marginTop: "2rem" }}
      >
        <div className={cn("h4", sty.stage)}>Description</div>
        <div className={sty.content} style={{ fontSize: "14px" }}>
          {details.desc}
        </div>
        {details?.links && <Links items={details} />}
        {/* {addTags && (
                            <button
                                className={cn(
                                    "button-stroke-grey button-medium",
                                    styles.button
                                )}
                            >
                                <span>Add tags</span>
                                <Icon name="plus" />
                            </button>
                        )} */}
        {details?.tags && <Tags tags={details?.tags[0].name} />}
      </div>
      {/* <div className={styles.foot}>
        <div className={styles.stage}>Description</div>
        <div className={styles.content}>{details?.desc}</div>
      </div> */}
    </div>
  );
};

export default Details;
