import { NextApiRequest, NextApiResponse } from "next";
import { deleteMission } from "models/mission";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        const missionId = req.body.missionId;
        await deleteMission(missionId);
        return res.send({
            message: "Mission successfully deleted"
        })
      } catch (err: any) {
        throw new Error("Error deleting Mission" + err);
      }
    }
     else {
      res.send({
        error:
          "You must be signed in to delete mission.",
      });
    }
 }