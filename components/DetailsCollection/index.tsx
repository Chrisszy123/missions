import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import styled from "@/components/Description/Description.module.sass";
import sty from "@/components/Description/Description.module.sass";
import s from "@/components/Header/Menu/Menu.module.sass";
import Statistics from "./Statistics";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";
import Preview from "@/components/Preview";
import LayoutCreate from "@/components/LayoutCreate";
import Field from "@/components/Field";
import { AuthContext } from "context/AuthContext";
import { WalletContext } from "context/WalletContext";
import Links from "./Links";
import Tags from "./Tags";
import useFilePreview from "@/hooks/useFilePreview";

import {
  updateCommunity,
  getOneUser,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
  getCommunity,
} from "@/utils/axios";
import Layout from "../Layout";
import Congrats from "../Congrats";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Spinner from "../Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Overlay from "../Overlay/Overlay";
import MoonLoader from "react-spinners/MoonLoader";

type DetailsType = {
  name: string;
  desc: string;
  secondaryLink: string;
  link: string;
  tags: string[];
};

type DetailsProps = {
  details: DetailsType[] | any;
  setDeleted?: Dispatch<SetStateAction<boolean>> | any;
};
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type AlertType = "error" | "warning" | "success";

// Global Alert div.
const Alert = ({ children, type }: { children: string; type: AlertType }) => {
  const backgroundColor =
    type === "error" ? "tomato" : type === "warning" ? "orange" : "powderBlue";

  return <div style={{ padding: "0 10", backgroundColor }}>{children}</div>;
};

// Use role="alert" to announce the error message.
const AlertInput = ({ children }: { children: React.ReactNode }) =>
  Boolean(children) ? (
    <span role="alert" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null;

const CommunitySchema = z.object({
  desc: z.string().min(5),
  name: z.string().min(5),
  link: z.string().url(),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  // tags: z.string().array(),
});

type CommunityType = z.infer<typeof CommunitySchema>;

const Details = ({ details, setDeleted }: DetailsProps) => {
  const creator = details?.ownerId;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletemModalIsOpen, setDeleteModal] = useState(false);
  const [isMember, setIsMember] = useState<any>(false);
  const [editedCommunity, setEditedCommunity] = useState<any>(undefined);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [inputData, setInputData] = useState<string>("");

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
      if (e?.id === userId) {
        setIsMember(true);
      }
    });
  }, [userId]);

  const queryClient = useQueryClient();
  //const router = useRouter()
  const { status, error, mutate } = useMutation({
    mutationFn: joinCommunity,
    onSuccess: (res) => {
      console.log(res);
      queryClient.setQueryData(["communities", res?.message?.data.id], res);
      router.reload();
    },
  });
  const {
    status: leaveStatus,
    error: leaveError,
    mutate: leaveMutate,
  } = useMutation({
    mutationFn: leaveCommunity,
    onSuccess: (res) => {
      console.log(res);
      queryClient.setQueryData(["communities", res?.message?.data.id], res);
      router.reload();
    },
  });
  //

  getOneUser(walletAddress).then((e: any) => {
    setUserId(e?.message?.data?.id);
  });
  const customStyles = {
    content: {
      height: "30%",
      width: "40%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "rgb(39 39 42)",
      transform: "translate(-50%, -50%)",
      borderRadius: "2rem",
    },
    overlay: {
      zIndex: "100",
    },
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CommunityType>({
    resolver: zodResolver(CommunitySchema),
  });

  const imageWatch = useWatch({
    control,
    name: "image",
    defaultValue: null,
  });

  const name = useWatch({
    control,
    name: "name",
    defaultValue: "",
  });

  const desc = useWatch({
    control,
    name: "desc",
    defaultValue: "",
  });

  const { imageUrl } = useFilePreview(imageWatch);
  const { user, setCommTags }: any = useContext(AuthContext);
  const handleClick = () => {
    if (inputData.trim() !== "") {
      setDataArray((prevDataArray) => [...prevDataArray, inputData]);
      setInputData("");
      setCommTags(dataArray);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };
  const uploadFile = async (img: any) => {
    try {
      if (img == null) throw new Error("No file was uploaded.");
      const imageRef = ref(storage, `communities/${img.name + v4()}`);

      const snapshot = await uploadBytes(imageRef, img);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (community: CommunityType) => {
    const uploadedImageUrl = await uploadFile(community.image[0]);

    const communityData = {
      name: community.name,
      tags: dataArray,
      link: community.link,
      image: uploadedImageUrl,
      desc: community.desc,
      id: communityId,
      userId: user?.message?.data.id,
      ownerId: user?.message?.data.id,
    };

    const comm = await updateCommunity(communityData);

    console.log("COMM", comm);

    // use data to redirect
    if (comm?.status === true) {
      setEditedCommunity(comm.message);
      router.reload();
    }
  };
  const handleJoin = async () => {
    try {
      mutate({
        id: communityId,
        userId,
      });
    } catch (err: any) {
      throw new Error("error joining community" + err);
    }
  };
  const handleLeave = async () => {
    try {
      leaveMutate({
        id: communityId,
        userId,
      });
    } catch (err: any) {
      throw new Error("error leaving community" + err);
    }
  };
  const handleDelete = async () => {
    const deletedCommunity = await deleteCommunity(communityId as string);
    if (deletedCommunity.status === true) {
      setDeleteModal(false);
      setDeleted(true);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <>
      {status === "loading" || leaveStatus === "loading" ? (
        <Overlay>
          <div className="flex justify-center items-center p-8">
            <MoonLoader
              loading={true}
              color="#000"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </Overlay>
      ) : (
        <div className={styles.details}>
          <div className={styles.head}>
            <div className={styles.box}>
              <div
                className={cn("h2", styles.user)}
                style={{ fontSize: "30px" }}
              >
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
                <>
                  <button
                    className={cn(
                      "button-stroke-grey button-medium",
                      styles.button
                    )}
                    onClick={openDeleteModal}
                    style={{
                      paddingLeft: "0.5rem",
                      paddingRight: "0.6rem",
                      marginLeft: "0px",
                    }}
                  >
                    <Icon name="delete" />
                  </button>
                  <button
                    className={cn(
                      "button-stroke-grey button-medium",
                      styles.button
                    )}
                    onClick={openModal}
                    style={{
                      paddingLeft: "0.5rem",
                      paddingRight: "0.6rem",
                      marginLeft: "2px",
                    }}
                  >
                    <Icon name="edit" />
                  </button>
                </>
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
                        marginLeft: "2px",
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
              isOpen={deletemModalIsOpen}
              onRequestClose={closeDeleteModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <div className="flex flex-col justify-center items-center rounded-lg h-[100%] w-[100%] capitalize gap-4">
                <div
                  className={cn("h2", styles.user, "text-[30px] text-white")}
                >
                  Delete Community
                </div>
                <span className="text-white opacity-70 text-center mb-2">
                  Once community is deleted it cannot be restored, Click on
                  delete to continue
                </span>
                <div className="flex justify-center items-center gap-2">
                  <a
                    onClick={closeDeleteModal}
                    className={cn("button", s.button, " cursor-pointer")}
                  >
                    <span>close</span>
                    <Icon name="close" />
                  </a>

                  <a
                    className={cn(
                      "button-white",
                      styles.button,
                      " cursor-pointer m-0"
                    )}
                    onClick={handleDelete}
                  >
                    <span>delete</span>
                    <Icon name="arrow-right" /> 
                  </a>
                </div>
              </div>
            </Modal>
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
              {editedCommunity ? (
                <Layout layoutNoOverflow footerHide noRegistration>
                  <Congrats
                    title="SUCCESS"
                    onClick={closeModal}
                    content={<>You&apos;ve now edited your community!</>}
                    // links={
                    //   <>
                    //     <Link href={`/communities/${editedCommunity.id}`}>
                    //       <a className={cn("button-large", styles.button)}>
                    //         View community
                    //       </a>
                    //     </Link>
                    //   </>
                    // }
                  />
                </Layout>
              ) : (
                <LayoutCreate
                  left={
                    <>
                      <div className={styles.head}>
                        <div className={cn("h1", styles.title)}>
                          Edit <br></br>Community.
                        </div>
                        <button onClick={closeModal}>
                          <a className={cn("button-circle", style.back)}>
                            <Icon name="arrow-left" />
                          </a>
                        </button>
                      </div>
                      <div className={styles.info}>Edit community.</div>
                      <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                      >
                        <label>
                          <div className="w-full h-40 flex flex-col gap-2 items-center justify-center border-4 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-200 transition-all">
                            <PhotoIcon className="h-12 text-gray-400" />
                            Select image
                          </div>
                          <Field
                            className={(styles.field, "hidden")}
                            type="file"
                            icon="profile"
                            large
                            required
                            register={register("image")}
                          />
                          <AlertInput>
                            {errors?.image?.message?.toString()}
                          </AlertInput>
                        </label>

                        <Field
                          className={styles.field}
                          placeholder={details?.name}
                          icon="profile"
                          large
                          register={register("name")}
                          aria-invalid={Boolean(errors.name)}
                        />
                        <AlertInput>{errors?.name?.message}</AlertInput>

                        <Field
                          className={styles.field}
                          placeholder={details?.link}
                          icon="profile"
                          large
                          register={register("link")}
                        />
                        <AlertInput>{errors?.link?.message}</AlertInput>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          {dataArray.length >= 0 ? (
                            <div className="flex gap-4 mt-4">
                              Tags:
                              {dataArray.map((e: any, index) => (
                                <div key={index}>{e}</div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              {details?.tags.length >= 0 ? (
                                <div>
                                  {details?.tags.map((e: any, i: any) => (
                                    <div key={i}>{e?.name[0]}</div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <Field
                          className={styles.field}
                          placeholder="tags"
                          icon="plus"
                          // register={register("tags")}
                          value={inputData}
                          onChange={handleInputChange}
                          onClick={handleClick}
                          large
                        />
                        {/* <AlertInput>{errors?.tags?.message}</AlertInput> */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        ></div>
                        <Field
                          className={cn(styles.field, "placeholder:text-slate-200")}
                          placeholder={details?.desc}
                          icon="email"
                          textarea
                          large
                          register={register("desc")}
                        />
                        <AlertInput>{errors?.desc?.message}</AlertInput>

                        <button type="submit">
                          <a className={cn("button-large", styles.button)}>
                            <span>Edit Community</span>
                            <Icon name="arrow-right" />
                          </a>
                        </button>

                        {isSubmitting && <Spinner />}

                        {Boolean(Object.keys(errors)?.length) && (
                          <div>
                            There are errors, please correct them before
                            submitting the form
                          </div>
                        )}
                      </form>
                    </>
                  }
                >
                  <Preview imageUrl={imageUrl} name={name} desc={desc} />
                </LayoutCreate>
              )}
            </Modal>
          </div>
          <div className={styles.list} style={{ marginBottom: "1rem" }}>
            <div className={styles.item}>
              <div className={styles.label}>
                <Icon name="profile-fat" /> Users
              </div>
              <div className={cn("h4", styles.value)}>
                {details?.users.length}
              </div>
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
              {details?.desc}
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
            {details?.tags && <Tags tags={details?.tags} />}
          </div>
          {/* <div className={styles.foot}>
         <div className={styles.stage}>Description</div>
         <div className={styles.content}>{details?.desc}</div>
       </div> */}
        </div>
      )}
    </>
  );
};

export default Details;
