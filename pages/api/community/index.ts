import { getAllCommunities, getOneCommunity } from "models/commuinity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    if(req.body){
        const id = req.body.communityId
        console.log(id)
        const community = await getOneCommunity(id)
        return res.json(community)
    }else{
        const commuinities = await getAllCommunities()
        return res.json(commuinities)
    }
    
}