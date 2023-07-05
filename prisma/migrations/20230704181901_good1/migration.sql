/*
  Warnings:

  - You are about to drop the column `userId` on the `Mission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_userId_fkey";

-- AlterTable
ALTER TABLE "Mission" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_MissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MissionToUser_AB_unique" ON "_MissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MissionToUser_B_index" ON "_MissionToUser"("B");

-- AddForeignKey
ALTER TABLE "_MissionToUser" ADD CONSTRAINT "_MissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionToUser" ADD CONSTRAINT "_MissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
