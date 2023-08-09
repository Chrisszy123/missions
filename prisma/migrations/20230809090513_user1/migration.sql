-- CreateEnum
CREATE TYPE "MissionAnswerStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- CreateTable
CREATE TABLE "MissionAnswer" (
    "id" TEXT NOT NULL,
    "answer" JSONB,
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "MissionAnswerStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,

    CONSTRAINT "MissionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MissionAnswer_id_key" ON "MissionAnswer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MissionAnswer_missionId_key" ON "MissionAnswer"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "MissionAnswer_userId_key" ON "MissionAnswer"("userId");

-- AddForeignKey
ALTER TABLE "MissionAnswer" ADD CONSTRAINT "MissionAnswer_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionAnswer" ADD CONSTRAINT "MissionAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionAnswer" ADD CONSTRAINT "MissionAnswer_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
