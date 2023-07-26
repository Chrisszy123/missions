import AccessDenied from "@/components/AccessDenied/AccessDenied";
import Congrats from "@/components/Congrats";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Preview from "@/components/Preview";

import useFilePreview from "@/hooks/useFilePreview";

import { createMission } from "@/utils/axios";
import { storage } from "@/utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";

import cn from "classnames";
import { AuthContext } from "context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import styles from "./CreateStep1Page.module.sass";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { getOneCommunity } from "models/community";

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

const Create = ({ ownerId }: any) => {
  const { status, data: sessionData }: any = useSession();
  const [createdMission, setCreatedMission] = useState<any>(undefined);
  const [communityId, setCommunityId] = useState<string>("");

  const router = useRouter();
  const slug = router.asPath;

  const extractSubstring = () => {
    const regex = /\/communities\/([^/]+)\//;
    const match = slug.match(regex);

    if (match && match[1]) {
      const extractedString = match[1];
      setCommunityId(extractedString);
    } else {
      console.log("Substring not found");
    }
  };
  useEffect(() => {
    extractSubstring();
  }, [slug]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MissionType>({
    resolver: zodResolver(MissionSchema),
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
  const rewards = useWatch({
    control,
    name: "rewards",
    defaultValue: "",
  });

  const { imageUrl } = useFilePreview(imageWatch);
  const { user }: any = useContext(AuthContext);
  const userId = user?.message?.data?.id;
  if (status === "unauthenticated" || sessionData === null) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <AccessDenied message="You need to be signed in to create mission" />
      </Layout>
    );
  }

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
      name: mission.name,
      rewards: mission.rewards,
      image: uploadedImageUrl,
      desc: mission.desc,
      userId: user?.message?.data.id,
      communityId: communityId,
    };

    const createdMission = await createMission(data);

    // use data to redirect
    if (createdMission?.status === true) {
      setCreatedMission(createdMission.message);
      console.log("CREATED mission");
    }
  };

  if (createdMission) {
    return (
      <Layout layoutNoOverflow footerHide noRegistration>
        <Congrats
          title="Congrats"
          content={
            <>
              You&apos;ve now created your mission! <br></br>This is an
              important first step for all creators to make to allow users join
              in on your mission
            </>
          }
          links={
            <>
              <Link
                href={`/communities/${communityId}/missions/${createdMission.id}`}
              >
                <a className={cn("button-large", styles.button)}>
                  View Mission
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
                Create a <br></br>Mission.
              </div>
              <Link href="">
                <a className={cn("button-circle", styles.back)}>
                  <Icon name="arrow-left" />
                </a>
              </Link>
            </div>
            <div className={styles.info}>
              Create a Mission on o1Node to allow users join.
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

              {userId === ownerId ? (
                <button type="submit">
                  <a className={cn("button-large", styles.button)}>
                    <span>Create Mission</span>
                    <Icon name="arrow-right" />
                  </a>
                </button>
              ) : (
                <div>only owners can create missions</div>
              )}

              {isSubmitting && (
                <Alert type="success">Creating mission...</Alert>
              )}

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
        <Preview
          imageUrl={imageUrl}
          name={name}
          desc={desc}
          rewards={rewards}
        />
      </LayoutCreate>
    </Layout>
  );
};

export default Create;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const communityId = context.query.Id;
  const community: any = await getOneCommunity(communityId);
  const ownerId = community?.ownerId;
  return {
    props: {
      ownerId,
    },
  };
}
