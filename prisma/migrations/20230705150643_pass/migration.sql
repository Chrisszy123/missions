/*
  Warnings:

  - The `name` column on the `CommunityTags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `CommunityImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityImage" DROP CONSTRAINT "CommunityImage_communityId_fkey";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "CommunityTags" DROP COLUMN "name",
ADD COLUMN     "name" TEXT[];

-- DropTable
DROP TABLE "CommunityImage";
