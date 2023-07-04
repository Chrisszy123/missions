import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";
import { createCommunity, getUsers } from "@/utils/axios";
import { storage } from "@/utils/firebase";
import { v4 } from "uuid";
import { AuthContext } from "context/AuthContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
//modal

const CreatPage = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<any>(false);
  const [userId, setUserId] = useState<any>();

  const {
    user,
    setCommName,
    setCommImage,
    setCommDesc,
    setCommLink,
    setCommTags,
  }: any = useContext(AuthContext);
  const useremail = user?.email;
  //
  getUsers().then((e: any) => {
    const filteredUser = e?.message?.data?.filter(
      (user: any) => user.email === useremail
    );
    if(!filteredUser) return
    setUserId(filteredUser[0]?.id);
  });
  //
  const uploadFile = (img: any) => {
    if (img == null) return;
    const imageRef = ref(storage, `communities/${img.name + v4()}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage((prev: any) => [...prev, url]);
        setCommImage(url)
      }).catch((err: any) => console.log(err));
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const communityData = {
        name: name,
        tags: tags,
        link: link,
        image: image[0],
        desc: desc,
        userId: userId,
      };
      const comm = await createCommunity(communityData);
      // use data to redirect
      if (comm?.status === true) {
        window.location.replace("/congrats");
      }
    } catch (err: any) {
      throw new Error("errors submitting community data" + err);
    }
  };
  return (
    <Layout layoutNoOverflow footerHide emptyHeader>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Create a <br></br>Community.
              </div>
              <Link href="">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>
              Create a community on o1Node to be able to create Missions.
            </div>
            <form
              className={styles.form}
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <Field
                className={styles.field}
                type="file"
                icon="profile"
                onChange={(e: any) => {
                  uploadFile(e.target.files[0]);
                }} // change to cloudinary url
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="name"
                icon="profile"
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                  setCommName(e.target.value);
                }}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="URL/Link"
                icon="profile"
                value={link}
                onChange={(e: any) => {
                  setLink(e.target.value);
                  setCommLink(e.target.value);
                }}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Tags"
                icon="profile"
                value={tags}
                onChange={(e: any) => {
                  setTags(e.target.value);
                  setCommTags(e.target.value);
                }}
                large
                required
              />
              <Field
                className={styles.field}
                placeholder="Description"
                icon="email"
                textarea
                value={desc}
                onChange={(e: any) => {
                  setDesc(e.target.value);
                  setCommDesc(e.target.value);
                }}
                large
                required
              />
              <button type="submit">
                <a className={cn("button-large", styles.button)}>
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
        <Preview />
      </LayoutCreate>
    </Layout>
  );
};

export default CreatPage;
