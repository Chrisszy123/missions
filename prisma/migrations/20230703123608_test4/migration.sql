-- DropForeignKey
ALTER TABLE "CommunityImage" DROP CONSTRAINT "CommunityImage_communityId_fkey";

-- AddForeignKey
ALTER TABLE "CommunityImage" ADD CONSTRAINT "CommunityImage_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
