import { leaveCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        const community = await leaveCommunity(data)
        return res.json(community)
    }catch(err: any){
        throw new Error("Error leaving community" + err)
    }
}