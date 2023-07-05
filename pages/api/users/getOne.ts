import { getOneUser } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
        const email = req.body.email
        const user = await getOneUser(email)
        return res.json(user)
}