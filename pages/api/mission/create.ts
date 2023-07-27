import { createMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = req.body;
      const mission = await createMission(data);
      return res.json(mission);
    } catch (err: any) {
      throw new Error("Error creating mission" + err);
    }
  } else {
    res.send({
      error: "You must be signed in to create mission.",
    });
  }
}
