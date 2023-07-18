import { updateOneMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions  from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = req.body;
      await updateOneMission(data.missionData);
      res.status(200).send("updated mission successfully");
      return { status: true, message: "success updating mission" };
    } catch (err: any) {
      throw new Error("Error updating community" + err);
    }
  } else {
    res.send({
      error: "You must be signed in to update mission.",
    });
  }
}
