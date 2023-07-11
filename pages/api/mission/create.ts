import { createMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        const mission = await createMission(data)
        return res.json(mission)
    }catch(err: any){
        throw new Error("Error creating mission" + err)
    }
}