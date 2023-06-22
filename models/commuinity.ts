// import { CommunityData } from "~/types/communityData";
import prisma from "../utils/db";
import { z } from "zod";

const CommunitySchema = z
  .object({
    id: z.string(),
    desc: z.string().min(5),
    name: z.string().min(5),
    tags: z.string(),
    userId: z.string(),
    link: z.string().url(),
    secondaryLink: z.string().url(),
  })
  .partial({
    id: true,
    tags: true,
    userId: true,
    secondaryLink: true,
  });
type CommunityData = z.infer<typeof CommunitySchema>;

// handle create community
export const createCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    const existingCommunity = await prisma.community.findFirst({
      where: { link: communityData.link },
    });
    if (existingCommunity) throw new Error("Commnunity already exists");
    if (!communityData.userId)
      throw new Error("only a user can create a community");
    await prisma.community.create({
      data: communityData,
    });
  } catch (err: any) {
    throw new Error("error creating community" + err);
  }
};

export const updateCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    // check if user is the creator of the community
    const community = await prisma.community.findFirst({
      where: { link: communityData.link },
    });
    if (communityData.userId !== community?.userId)
      throw new Error("You cannot edit this community");
    const updatedCommunity = await prisma.community.update({
      where: { id: communityData.id },
      data: communityData,
    });
    return updatedCommunity;
  } catch (err: any) {
    return { status: false, message: "error updating community" };
  }
};

// delete a community
export const deleteCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    await prisma.community.delete({ where: { id: communityData.id } });
    return { status: true, message: "mission successfully deleted" };
  } catch (err: any) {
    throw new Error("error deleting user");
  }
};

//get one community

// get all communities
export const getAllCommunities = async () => {
  try {
    const community = await prisma.community.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (!community) return { message: "cannot get communities", status: false };
    return community;
  } catch (err: any) {
    throw new Error("error getting communities" + err);
  }
};

export const getOneCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    const community = await prisma.community.findFirst({
      where: { id: communityData.id },
    });
    if (!community)
      return {
        message: `community by id ${communityData.id} does not exist`,
        status: false,
      };
    return community;
  } catch (err: any) {
    throw new Error(`error getting community ${communityData.id}`);
  }
};

export const getUserCommunity = async (userId: any) => {
  try {
    const community = await prisma.community.findFirst({
      where: { userId: userId },
    });
    if (!community)
      return {
        message: `community by id ${userId} does not exist`,
        status: false,
      };
    return community;
  } catch (err: any) {
    throw new Error(`error getting community ${userId}`);
  }
};
