import { getTag } from "models/tags";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const communityId = req.body
    const user = await getTag(communityId)
    return res.json(user)
}