import { getAllCommunities, getOneCommunity } from "models/community";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if(session) {
        if(req.body){
            const id = req.body.communityId
            const community = await getOneCommunity(id)
            return res.json(community)
        }else{
            const commuinities = await getAllCommunities()
            return res.json(commuinities)
        }
    }else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
          })
    } 
}