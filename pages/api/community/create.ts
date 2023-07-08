import { createCommunity } from "models/commuinity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        await createCommunity(data.communityData)
        return res.json(data)
    }catch(err: any){
        throw new Error("Error creating community" + err)
    }
}