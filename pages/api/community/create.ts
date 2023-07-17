import { createCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        const community = await createCommunity(data.communityData)
        return res.json(community)
    }catch(err: any){
        throw new Error("Error creating community" + err)
    }
}