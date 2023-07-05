import { getTags } from "models/tags";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const user = await getTags()
    return res.json(user)
}