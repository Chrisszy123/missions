import { createCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = req.body;
      const community = await createCommunity(data.communityData);
      return res.json(community);
    } catch (err: any) {
      throw new Error("Error creating community" + err);
    }
  } else {
    res.send({
      error: "You must be signed in to create community.",
    });
  }
}
