import { getAllCommunities, getOneCommunity } from "models/commuinity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    if(req.body){
        const id = req.body.communityId
        const community = await getOneCommunity(id)
        return res.json(community)
    }else{
        const commuinity = await getAllCommunities()
        return res.json(commuinity)
    }
    
}