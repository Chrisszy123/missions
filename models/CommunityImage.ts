import prisma from "../utils/db";
// import { z } from "zod";
// import community from "pages/api/community";
// const ImageSchema = z.object({
//     publicId: z.string(),
//     format: z.string(),
//     version: z.string(),
//     communityId: z.any()
// }).partial({
//     format: true,
//     version: true
// })
// type ImageData = z.infer<typeof ImageSchema>

// export const getImage = async({communityId}: ImageData) => {
//     try{
//         const tag = await prisma.communityImage.findFirst({
//             where: {
//                 communityId
//             }
//         })
//         return {status: true, message: tag}
//     }catch(err: any){
//         throw new Error("error getting tags")
//     }
// }

// export const createImage = async(data: ImageData) => {
//     const communityImage = ImageSchema.parse(data)
//     try{
//         const image = await prisma.communityImage.findFirst({
//             where: {
//                 publicId: communityImage.publicId
//             }
//         })
//         if(image) throw new Error("A community with thesame Image url exist")
//         const communityimage = await prisma.communityImage.create({
//             data: {
//                 publicId: communityImage.publicId,
//                 communityId: communityImage.communityId
//             }
//         })
//         return communityimage
//     }catch(err: any){
//         throw new Error("Error creating image")
//     }
// }