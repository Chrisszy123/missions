import { createMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        await createMission(data)
        return{ status: true, message: "success creating mission"}
    }catch(err: any){
        throw new Error("Error creating mission" + err)
    }
}