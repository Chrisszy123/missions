import prisma from "../utils/db";
//import { UserData } from "~/types/userData";
import { z } from "zod";

const UserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(5),
    nickname: z.string().min(3),
    role: z.enum(["BASIC", "ADMIN", "CREATOR"]),
    password: z.string(),
    walletAddress: z.string(),
    levelId: z.string(),
    winnerId: z.string(),
  })
  .partial({
    password: true,
    role: true,
    id: true,
    walletAddress: true,
    levelId: true,
    winnerId: true,
  });
type UserData = z.infer<typeof UserSchema>;

export const createUser = async (data: UserData) => {
  const userData = UserSchema.parse(data);
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) return
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        username: userData.nickname,
      },
    });
    return user;
  } catch (err: any) {
    throw new Error("error creating user" + err);
  }
};

export const deleteUser = async (data: UserData) => {
  const userData = UserSchema.parse(data);
  //logic for delete user
  try {
    await prisma.user.delete({ where: { id: userData.id } });
    return { status: true, message: "user successfully deleted" };
  } catch (err: any) {
    throw new Error("error deleting user" + err);
  }
};
// update user
export const updateUser = async (data: UserData) => {
  const userData = UserSchema.parse(data);
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: userData,
    });
    return updatedUser;
  } catch (err: any) {
    return { status: false, message: "error updating user details" };
  }
};
// get all missions
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (!users) throw new Error("users does not exist");
    return users;
  } catch (err: any) {
    throw new Error(err)
  }
};

//get one user
export const getOneUser = async (email : any) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        communities: true,
        missions: true
      } 
    });
    if (!user) throw new Error("user missing");
    return user;
  } catch (err: any) {
    throw new Error("error getting user");
  }
};
// enter a mission
