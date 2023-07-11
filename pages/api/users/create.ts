import { createUser } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        const data = req.body
        if(!data.userData) return res.json({message: "user data missing"})
        const user = await createUser(data.userData)
        res.status(200).send(user)
        return{ status: true, message: "user"}
    }catch(err: any){
        throw new Error("Error creating user" + err)
    }
}