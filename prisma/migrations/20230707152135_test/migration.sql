-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'CREATOR');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('DRAFT', 'PENDING', 'OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('URL', 'IMAGE', 'TEXT', 'QUIZ', 'VISIT', 'EMPTY', 'TWITTER', 'DISCORD', 'TELEGRAM', 'INVITES');

-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('ONCE', 'DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "ReviewState" AS ENUM ('PENDING', 'APPROVED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "name" TEXT,
    "walletAddress" TEXT NOT NULL,
    "levelId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "winnerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "link" TEXT,
    "image" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityTags" (
    "id" TEXT NOT NULL,
    "name" TEXT[],

    CONSTRAINT "CommunityTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "desc" TEXT,
    "name" TEXT,
    "rewards" TEXT[],
    "category" TEXT[],
    "state" "State" NOT NULL DEFAULT 'PENDING',
    "submissionType" "SubmissionType" NOT NULL DEFAULT 'URL',
    "recurrence" "Recurrence" NOT NULL DEFAULT 'ONCE',
    "communityId" TEXT NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winners" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Winners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "state" "ReviewState" NOT NULL DEFAULT 'PENDING',
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommunityToCommunityTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UsersUserRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Level_id_key" ON "Level"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Community_id_key" ON "Community"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityTags_id_key" ON "CommunityTags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Mission_id_key" ON "Mission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Mission_name_key" ON "Mission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Winners_id_key" ON "Winners"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_id_key" ON "Reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_missionId_key" ON "Reviews"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_key" ON "Reviews"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityToCommunityTags_AB_unique" ON "_CommunityToCommunityTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityToCommunityTags_B_index" ON "_CommunityToCommunityTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UsersUserRelation_AB_unique" ON "_UsersUserRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersUserRelation_B_index" ON "_UsersUserRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MissionToUser_AB_unique" ON "_MissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MissionToUser_B_index" ON "_MissionToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Winners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToCommunityTags" ADD CONSTRAINT "_CommunityToCommunityTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToCommunityTags" ADD CONSTRAINT "_CommunityToCommunityTags_B_fkey" FOREIGN KEY ("B") REFERENCES "CommunityTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersUserRelation" ADD CONSTRAINT "_UsersUserRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersUserRelation" ADD CONSTRAINT "_UsersUserRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionToUser" ADD CONSTRAINT "_MissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionToUser" ADD CONSTRAINT "_MissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
