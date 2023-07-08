import prisma from "../utils/db";
import { z } from "zod";

const TagsSchema = z.object({
    name: z.any(),
    communityId: z.string()
}).partial({
    communityId: true
})
type TagsData = z.infer<typeof TagsSchema>;

export const createTag = async(data: TagsData) => {
    const tagsData = TagsSchema.parse(data)
    try{
        const existingTag = await prisma.communityTags.findFirst({
            where: {
                community: {
                    some: {
                        id: tagsData.communityId
                    }
                }
            }
        })
        if(existingTag) throw new Error('community already have existing Tags')
        await prisma.communityTags.create({
            data: {
                name: tagsData.name,
                community: {
                    connect: {
                        id: tagsData.communityId
                    }
                }
            }
        })
    }catch(err: any){
        throw new Error("error creating tags")
    }
}
export const getTags = async() => {
    try{
        const tag = await prisma.communityTags.findMany()
        return {status: true, message: tag}
    }catch(err: any){
        throw new Error("error getting tags")
    }
}

export const getTag = async({communityId}: any) => {
    try{
        const tag = await prisma.communityTags.findFirst({
            where: {
                community: {
                    some: {
                        id: communityId
                    }
                }
            }
        })
        return {status: true, message: tag}
    }catch(err: any){
        throw new Error("error getting tags")
    }
}