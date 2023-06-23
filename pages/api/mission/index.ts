import { getAllMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const missions = await getAllMission()
    return res.json(missions)
}