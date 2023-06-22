import { getAllCommunities } from "models/commuinity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const missions = await getAllCommunities()
    return res.json({data: missions})
}