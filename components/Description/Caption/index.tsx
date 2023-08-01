import cn from "classnames";
import styles from "./Caption.module.sass";
import s from "@/components/Header/Menu/Menu.module.sass";
import Icon from "@/components/Icon";
import Preview from "@/components/Preview";
import style from "@/templates/Create/CreatePage/CreateStep1Page.module.sass";
import ReactModal from "react-modal";
import LayoutCreate from "@/components/LayoutCreate";
import Field from "@/components/Field";

import useFilePreview from "@/hooks/useFilePreview";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/AuthContext";
import { deleteMission, updateMission } from "@/utils/axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Congrats from "@/components/Congrats";
import Layout from "@/components/Layout";

type CaptionProps = {
  title?: string;
  date?: string;
  data?: any;
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

  return (
    <div style={{ padding: "0 10", backgroundColor, marginTop: "2rem" }}>
      {children}
    </div>
  );
};

// Use role="alert" to announce the error message.
const AlertInput = ({ children }: { children: React.ReactNode }) =>
  Boolean(children) ? (
    <span role="alert" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null;

const MissionSchema = z
  .object({
    desc: z.string().min(5),
    name: z.string().min(5),
    rewards: z.string(),
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
  })
  .partial({
    image: true,
  });

type MissionType = z.infer<typeof MissionSchema>;

const Caption = ({ title, date, data, setDeleted }: CaptionProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletemModalIsOpen, setDeleteModal] = useState(false);

  const [editedMission, setEditedMission] = useState<any>(undefined);
  const owner = data?.community?.ownerId;
  const router = useRouter();
  const communityId = router.query.Id;
  const missionId = router.query.missionId;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MissionType>({
    resolver: zodResolver(MissionSchema),
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
  const rewards = useWatch({
    control,
    name: "rewards",
    defaultValue: "",
  });

  const { imageUrl } = useFilePreview(imageWatch);
  const { user }: any = useContext(AuthContext);
  const userId = user?.message?.data?.id;
  const uploadFile = async (img: any) => {
    try {
      if (img == null) throw new Error("No file was uploaded.");
      const imageRef = ref(storage, `missions/${img.name + v4()}`);

      const snapshot = await uploadBytes(imageRef, img);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (mission: MissionType) => {
    const uploadedImageUrl = await uploadFile(mission.image[0]);

    const data = {
      id: missionId,
      name: mission.name,
      rewards: mission.rewards,
      image: uploadedImageUrl,
      desc: mission.desc,
      userId: user?.message?.data.id,
      communityId: communityId,
    };

    const createdMission = await updateMission(data);

    // use data to redirect
    if (createdMission?.status === true) {
      setEditedMission(createdMission.message);
      router.reload();
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
  const handleDelete = async () => {
    const deletedCommunity = await deleteMission(missionId as string);
    if (deletedCommunity.status === true) {
      setDeleteModal(false);
      setDeleted(true);
    }
  };
  return (
    <div className={styles.caption} style={{ marginBottom: "4rem" }}>
      <div className={styles.line}>
        <div className={cn("h2", styles.title)}>{title}</div>
        <div className={styles.actions}>
          {owner !== userId ? (
            <div> </div>
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
                className={cn("button-circle button-medium", styles.button)}
                onClick={openModal}
              >
                <Icon name="edit" />
              </button>
            </>
          )}
          <ReactModal
            isOpen={deletemModalIsOpen}
            onRequestClose={closeDeleteModal}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <div className="flex flex-col justify-center items-center rounded-lg h-[100%] w-[100%] capitalize gap-4">
              <div className={cn("h2", styles.user, "text-[30px] text-white")}>
                Delete Mission
              </div>
              <span className="text-white opacity-30 text-center mb-2">
                Once mission is deleted it cannot be restored, Click on delete
                to continue
              </span>
              <div className="flex justify-center items-center gap-2">
                <a
                  onClick={closeDeleteModal}
                  className={cn("button", s.button, " cursor-pointer")}
                >
                  <span>close</span>
                </a>

                <a
                  className={cn(
                    "button-white",
                    styles.button,
                    "m-0 cursor-pointer"
                  )}
                  onClick={handleDelete}
                >
                  <span>delete</span>
                  <Icon name="arrow-right" />
                </a>
              </div>
            </div>
          </ReactModal>
          <ReactModal
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
            {editedMission ? (
              <Layout layoutNoOverflow footerHide noRegistration>
                <Congrats
                  title="Success"
                  content={
                    <>
                      You&apos;ve now edited your mission! <br></br> please wait
                      a moment to see the updated mission
                    </>
                  }
                  // links={
                  //   <>
                  //     <Link
                  //       href={`/communities/${communityId}/missions/${editedMission.id}`}
                  //     >
                  //       <a className={cn("button-large", styles.button)}>
                  //         View Mission
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
                        Edit <br></br>Mission.
                      </div>
                    </div>
                    <div
                      className={styles.info}
                      style={{ marginBottom: "2rem" }}
                    >
                      Edit Mission on o1Node
                    </div>
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
                        placeholder="Name"
                        icon="profile"
                        large
                        register={register("name")}
                        aria-invalid={Boolean(errors.name)}
                      />
                      <AlertInput>{errors?.name?.message}</AlertInput>

                      <Field
                        className={styles.field}
                        placeholder="Rewards"
                        icon="profile"
                        large
                        register={register("rewards")}
                      />
                      <AlertInput>{errors?.rewards?.message}</AlertInput>

                      <Field
                        className={styles.field}
                        placeholder="Description"
                        icon="email"
                        textarea
                        large
                        register={register("desc")}
                      />
                      <AlertInput>{errors?.desc?.message}</AlertInput>

                      <button type="submit" className="mt-4 w-full">
                        <a className={cn("button-large", styles.button)}>
                          <span>Edit Mission</span>
                          <Icon name="arrow-right" />
                        </a>
                      </button>

                      {isSubmitting && (
                        <Alert type="success">Updating mission...</Alert>
                      )}

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
                <Preview
                  imageUrl={imageUrl}
                  name={name}
                  desc={desc}
                  rewards={rewards}
                />
              </LayoutCreate>
            )}
          </ReactModal>
          <a
            className={cn("button-circle button-medium", styles.button)}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="share" />
          </a>
        </div>
      </div>
      <div className={styles.date}>
        <Icon name="external-link" />
        {date}
      </div>
    </div>
  );
};

export default Caption;
