import prisma from "../utils/db";
import { z } from "zod";
import { missionSchema } from "@/types/missions";

type MissionData = z.infer<typeof missionSchema>
// handle create mission
export const createMission = async (data: MissionData) => {
  const missionData = missionSchema.parse(data);
  try {
    const existingMission = await prisma.mission.findFirst({
      where: { name: missionData.name },
    });
    if (existingMission)
      return { message: "mission already exist", status: false };
    if (!missionData.communityId)
      throw new Error("You cannot create a mission outside a community");
    if (!missionData.userId)
      throw new Error("Not Authenticated to create mission");
    const mission = await prisma.mission.create({
      data: {
        name: missionData.name,
        desc: missionData.desc,
        rewards: missionData.rewards,
        image: missionData.image,
        community: {
          connect: {
            id: missionData.communityId,
          },
        },
        users: {
          connect: {
            id: missionData.userId
          }
        }
      },
      include: {
        community: true,
      },
    });
    return { status: true, message: mission };
  } catch (err: any) {
    throw new Error("error creating mission" + err);
  }
};
// update mission
export const updateOneMission = async (data: MissionData) => {
  const missionData = missionSchema.parse(data);
  try {
    // check if user is the creator of mission
    // const mission = await prisma.mission.findFirst({
    //   where: { id: missionData.id },
    // });
    // if (mission.id )
    //   throw new Error("You cannot edit this mission");
    const updatedMission = await prisma.mission.update({
      where: { id: missionData.id },
      data: missionData,
    });
    return updatedMission;
  } catch (err: any) {
    return { status: false, message: "error updating mission" };
  }
};
// get all missions
export const getAllMissions = async () => {
  try {
    const missions = await prisma.mission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        community: {
          include: {
            tags: true
          }
        },
        users: true
      }
    });
    if (!missions) return { message: "cannot get missions", status: false };
    return missions;
  } catch (err: any) {
    return {
      message: "error getting missions" + err,
      status: false,
    };
  }
};

//get one mission
export const getOneMission = async (missionId: any) => {
  try {
    const mission = await prisma.mission.findFirst({
      where: { id: missionId },
      include: {
        users: true,
        community: {
          include: {
            tags: true
          }
        }
      }
    });
    if (!mission)
      return {
        message: `mission by id ${missionId} does not exist`,
        status: false,
      };
    return mission;
  } catch (err: any) {}
};
// delete one mission
export const deleteMission = async (data: MissionData) => {
  const missionData = missionSchema.parse(data);
  try {
    await prisma.mission.delete({ where: { id: missionData.id } });
    return { status: true, message: "mission successfully deleted" };
  } catch (err: any) {
    return { status: false, message: "error deleting mission" };
  }
};
// close mission
export const closeMission = async (data: MissionData, user: any) => {
  const missionData = missionSchema.parse(data);
  try {
    // only admins or creators can close mission
    if (user.role === "BASIC")
      throw new Error("Only admins or Creators can close a Mission");
    // set the mission state to closed
    await prisma.mission.update({
      where: { id: missionData.id },
      data: {
        state: "CLOSED",
      },
    });
  } catch (err: any) {
    throw new Error(`Error occured closing mission, ${err}`);
  }
};
// approve mission
export const approveMission = async (data: MissionData) => {
  const missionData = missionSchema.parse(data);
  try {
    // check if mission is not closed or open
    if (missionData.state !== "PENDING")
      throw new Error("Mission cannot be approved, State is not Pending");
    // now update the state field to open
    await prisma.mission.update({
      where: { id: missionData.id },
      data: {
        state: "OPEN",
      },
    });
    return { status: true, message: "mission successfully approved" };
  } catch (err: any) {
    throw new Error(`error approving mission ${err}`);
  }
};
//
export const enterMission = async (data: MissionData, userId: any) => {
  const missionData = missionSchema.parse(data);
  try {
    //check if mission is open
    const mission = await prisma.mission.findFirst({
      where: { id: missionData.id },
    });
    console.log(missionData);
    if (mission?.state !== "OPEN")
      throw new Error("Mission not open for entry");
    // add mission ID to the user missions
    await prisma.user.update({
      where: { id: userId },
      data: {
        missions: {
          connect: {
            id: missionData.id,
          },
        },
      },
    });
    return { status: true, message: "You have successfully started a mission" };
  } catch (err: any) {
    throw new Error("error entering mission" + err);
  }
};
