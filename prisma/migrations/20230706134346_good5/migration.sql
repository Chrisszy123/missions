/*
  Warnings:

  - Made the column `communityId` on table `Mission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mission" ALTER COLUMN "communityId" SET NOT NULL;
