import { updateOneMission } from "models/mission";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        await updateOneMission(data.missionData)
        res.status(200).send("updated mission successfully")
        return{ status: true, message: "success updating mission"}
    }catch(err: any){
        throw new Error("Error updating community" + err)
    }
}