import AccessDenied from "@/components/AccessDenied/AccessDenied";
import Congrats from "@/components/Congrats";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Preview from "@/components/Preview";

import useFilePreview from "@/hooks/useFilePreview";

import { createCommunity } from "@/utils/axios";
import { storage } from "@/utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";

import cn from "classnames";
import { AuthContext } from "context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import styles from "./CreateStep1Page.module.sass";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import MoonLoader from "react-spinners/MoonLoader";

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

const Create: NextPage = () => {
  const { status: state, data: sessionData }: any = useSession();
  const [createdCommunity, setCreatedCommunity] = useState<any>(undefined);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [inputData, setInputData] = useState<string>("");

  const queryClient = useQueryClient();
  //const router = useRouter()
  const { status, error, mutate } = useMutation({
    mutationFn: createCommunity,
    onSuccess: (newCommunity) => {
      queryClient.setQueryData(["communities", newCommunity.id], newCommunity);
      setCreatedCommunity(newCommunity?.message);
    },
  });
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

  if (state === "unauthenticated" || sessionData === null) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in to create community" />
      </Layout>
    );
  }

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
    mutate({
      name: community.name,
      tags: dataArray,
      link: community.link,
      image: uploadedImageUrl,
      desc: community.desc,
      userId: user?.message?.data.id,
      ownerId: user?.message?.data.id,
    });
  };

  if (createdCommunity) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <Congrats
          title="Congrats"
          content={
            <>
              You&apos;ve now created your community! <br></br>This is an
              important first step for all creators to make as you create new
              missions on o1node
            </>
          }
          links={
            <>
              <Link href={`/communities/${createdCommunity.id}`}>
                <a className={cn("button-large", styles.button)}>
                  View community
                </a>
              </Link>
            </>
          }
        />
      </Layout>
    );
  }

  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      <LayoutCreate
        left={
          <>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>
                Create a <br></br>Community.
              </div>
              <Link href="/communities">
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
                <AlertInput>{errors?.image?.message?.toString()}</AlertInput>
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
                placeholder="URL"
                icon="profile"
                large
                register={register("link")}
              />
              <AlertInput>{errors?.link?.message}</AlertInput>

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
                // register={register("tags")}
                value={inputData}
                onChange={handleInputChange}
                onClick={handleClick}
                large
              />
              {/* <AlertInput>{errors?.tags?.message}</AlertInput> */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              ></div>
              <Field
                className={styles.field}
                placeholder="Description"
                icon="email"
                textarea
                large
                register={register("desc")}
              />
              <AlertInput>{errors?.desc?.message}</AlertInput>

              <button type="submit">
                <a className={cn("button-large", styles.button)}>
                  <span>Create Community</span>
                  <Icon name="arrow-right" />
                </a>
              </button>
              {status === "loading" ? (
                <div className="flex justify-center items-center p-8">
                  <MoonLoader
                    loading={true}
                    color="#000"
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : null}

              {Boolean(Object.keys(errors)?.length) && (
                <div>
                  There are errors, please correct them before submitting the
                  form
                </div>
              )}
            </form>
          </>
        }
      >
        <Preview imageUrl={imageUrl} name={name} desc={desc} />
      </LayoutCreate>
    </Layout>
  );
};

export default Create;
