import { getAllUsers } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest,  res: NextApiResponse) {
    const user = await getAllUsers()
    return res.json(user)
}