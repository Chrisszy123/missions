import { joinCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = req.body;
      const community = await joinCommunity(data);
      return res.json(community);
    } catch (err: any) {
      throw new Error("Error joining community" + err);
    }
  } else {
    res.send({
      error: "You must be signed in to join community.",
    });
  }
}
