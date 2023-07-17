import { updateCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        await updateCommunity(data.communityData)
        return{ status: true, message: "success updating community"}
    }catch(err: any){
        throw new Error("Error updating community" + err)
    }
}