import { updateCommunity } from "models/commuinity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        console.log(data)
        await updateCommunity(data.communityData)
        return{ status: true, message: "success updating community"}
    }catch(err: any){
        throw new Error("Error updating community" + err)
    }
}