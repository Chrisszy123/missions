import { getOneUser } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
        const walletAddress = req.body.walletAddress
        const user = await getOneUser(walletAddress)
        return res.json(user)
}