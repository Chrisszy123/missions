// import { CommunityData } from "~/types/communityData";
import prisma from "../utils/db";
import { z } from "zod";

const CommunitySchema = z
  .object({
    id: z.string(),
    desc: z.string().min(5),
    name: z.string().min(5),
    tags: z.any(),
    user: z.any(),
    missions: z.any(),
    link: z.string().url(),
    image: z.string().url(),
    userId: z.string(),
    ownerId: z.string()
  })
  .partial({
    user: true,
    id: true,
    tags: true,
    missions: true
  });
type CommunityData = z.infer<typeof CommunitySchema>;

// handle create community
export const createCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    if(!communityData.userId) throw new Error('only users can create a community')
    const community = await prisma.community.create({
      data: {
        name: communityData.name,
        desc: communityData.desc,
        link: communityData.link,
        image: communityData.image,
        ownerId: communityData.ownerId,
        users: {
          connect: {
            id: communityData.userId
          }
        },
        tags: {
          create: {
            name: communityData.tags
          }
        }
        
      },
    });
    return {status: true, message: community}
  } catch (err: any) {
    throw new Error("error creating community" + err);
  }
};

export const updateCommunity = async (data: CommunityData) => {
  const communityData = CommunitySchema.parse(data);
  try {
    // check if user is the creator of the community
    const community = await prisma.community.findFirst({
      where: { users: {
        some: {
          id: communityData.userId 
        }
      }},
      include: {
        users: true
      }
    });
    if(communityData.userId !== community?.ownerId) throw new Error('not a creator of this community')
    const updatedCommunity = await prisma.community.update({
      where: { id: communityData.id },
      data: {
        name: communityData.name,
        desc: communityData.desc,
        link: communityData.link,
      },
    });
    return updatedCommunity;
  } catch (err: any) {
   throw new Error('error updating community' + err)
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
      include: {
        users: true,
        tags: true,
        owner: true
      }
    });
    if (!community) return { message: "cannot get communities", status: false };
    return community;
  } catch (err: any) {
    throw new Error("error getting communities" + err);
  }
};

export const getOneCommunity = async (communityId: any) => {
  try {
    const community = await prisma.community.findFirst({
      where: { id: communityId },
      include: {
        users: {
          include: {
            level: true,
            reviews: true
          }
        },
        missions: true,
        tags: true,
        owner: true
      }
    });
    if (!community) throw new Error('community does not exist')
    return community;
  } catch (err: any) {
    throw new Error(`error getting community ${communityId}` + err);
  }
};
