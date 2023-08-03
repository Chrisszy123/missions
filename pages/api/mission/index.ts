import { getAllMissions, getOneMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if(req.body){
      const id = req.body.missionId
      const mission = await getOneMission(id)
      return res.json(mission);
    }else{
      const missions = await getAllMissions();
      return res.json(missions);
    }
   
  } else {
    res.send({
      error: "You must be signed in to see mission data.",
    });
  }
}
