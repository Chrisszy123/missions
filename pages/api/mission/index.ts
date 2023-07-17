import { getAllMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const missions = await getAllMission();
    return res.json(missions);
  } else {
    res.send({
      error: "You must be signed in to see mission data.",
    });
  }
}
