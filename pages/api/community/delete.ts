import { NextApiRequest, NextApiResponse } from "next";
import { deleteCommunity } from "models/community";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      try {
        const communityId = req.body.communityId;
        console.log(communityId)
        await deleteCommunity(communityId);
        return res.send({
            message: "community successfully deleted"
        })
      } catch (err: any) {
        throw new Error("Error deleting community" + err);
      }
    }
     else {
      res.send({
        error:
          "You must be signed in to delete community.",
      });
    }
 }