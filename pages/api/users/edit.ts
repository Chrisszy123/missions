import { updateUser } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions  from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = req.body;
      const user = await updateUser(data.userData);
      return res.json(user);
    } catch (err: any) {
      throw new Error("Error updating user" + err);
    }
  } else {
    res.send({
      error: "You must be signed in to update user details.",
    });
  }
}
