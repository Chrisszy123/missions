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
import { useRouter } from "next/router";
//modal

const CreatePage = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<any>([]);
  const [link, setLink] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<object[] | null>([]);
  const [userId, setUserId] = useState<any>();
  const router = useRouter();
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [inputData, setInputData] = useState<string>("");

  const handleClick = () => {
    if (inputData.trim() !== "") {
      setDataArray((prevDataArray) => [...prevDataArray, inputData]);
      setInputData("");
      setCommTags(dataArray);
      console.log(dataArray); // Print the updated array
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const {
    user,
    setCommName,
    setCommImage,
    setCommDesc,
    setCommLink,
    setCommTags,
  }: any = useContext(AuthContext);
  const walletAddress = user?.walletAddress;
  //
  // getUsers().then((e: any) => {
  //   const filteredUser = e?.message?.data?.filter(
  //     (user: any) => user.walletAddress === walletAddress
  //   );
  //   if (!filteredUser) return;
  //   setUserId(filteredUser[0]?.id);
  // });
  //
  const uploadFile = (img: any) => {
    if (img == null) return;
    const imageRef = ref(storage, `communities/${img.name + v4()}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setImage(url);
          setCommImage(url);
        })
        .catch((err: any) => console.log(err));
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError(null);
      const communityData = {
        name: name,
        tags: dataArray,
        link: link,
        image: image,
        desc: desc,
        userId: user?.message?.data?.id,
        ownerId: user?.message?.data?.id,
      };
      const comm = await createCommunity(communityData);
      // use data to redirect
      if (comm?.status === true) {
        router.push("/congrats");
      }
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };
  console.log(error)
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
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
                placeholder="Name"
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
                placeholder="URL"
                icon="profile"
                value={link}
                onChange={(e: any) => {
                  setLink(e.target.value);
                  setCommLink(e.target.value);
                }}
                large
                required
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {" "}
                Tags:
                {dataArray.map((e: any, index) => (
                  <div key={index}>{e}</div>
                ))}
              </div>
              <Field
                className={styles.field}
                placeholder="Tags"
                icon="plus"
                value={inputData}
                onChange={handleInputChange}
                onClick={handleClick}
                large
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
              {/* {error &&
                error.map((err: any) => (
                  <span className="text-xs text-red-500">{err.message}</span>
                ))} */}
            </form>
          </>
        }
      >
        <Preview />
      </LayoutCreate>
    </Layout>
  );
};

export default CreatePage;
