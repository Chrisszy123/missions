import AccessDenied from "@/components/AccessDenied/AccessDenied";
import Congrats from "@/components/Congrats";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Preview from "@/components/Preview";

import useFilePreview from "@/hooks/useFilePreview";

import { createMission, getCommunity } from "@/utils/axios";
import { storage } from "@/utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";

import cn from "classnames";
import { AuthContext } from "context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import styles from "./CreateStep1Page.module.sass";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { getOneCommunity } from "models/community";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MoonLoader from "react-spinners/MoonLoader";
import { GetServerSidePropsContext } from "next";
import { getOneUser } from "models/user";
import {
  useAccount,
} from 'wagmi'
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

const Create = () => {
  const { status: state, data: sessionData }: any = useSession();
  const [createdMission, setCreatedMission] = useState<any>(undefined);
  const [ownerId, setOwnerId] = useState<string>("");

  const router = useRouter();
  const communityId = router.query.Id;
  //
  const queryClient = useQueryClient();
  const { status, error, mutate } = useMutation({
    mutationFn: createMission,
    onSuccess: (newMission) => {
      queryClient.setQueryData(["missions", newMission.id], newMission);
      setCreatedMission(newMission);
    },
  });
  //
  useEffect(() => {
    getCommunity(communityId).then((c) =>
      setOwnerId(c?.message?.data?.ownerId)
    );
  }, [communityId]);
  //
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

  if (state === "unauthenticated" || sessionData === null) {
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
    mutate({
      name: mission.name,
      rewards: mission.rewards,
      image: uploadedImageUrl,
      desc: mission.desc,
      userId: user?.message?.data.id,
      communityId: communityId,
    });
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
              <Link href={`/communities/${communityId}`}>
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
                  <div className={cn("button-large", styles.button)}>
                    <span>Create Mission</span>
                    <Icon name="arrow-right" />
                  </div>
                </button>
              ) : (
                <div>only owners can create missions</div>
              )}

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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session: any = await getSession(context)
  const walletAddress = session?.user?.address.toString().toLowerCase()
  const user: any = await getOneUser(walletAddress)
  const userId = user?.id
  const communityId = context.query.Id;
  const community = await getOneCommunity(communityId);
  const ownerId = community?.ownerId;
  if(userId !== ownerId) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return{
    props: {
      success: "success"
    }
  }
};
