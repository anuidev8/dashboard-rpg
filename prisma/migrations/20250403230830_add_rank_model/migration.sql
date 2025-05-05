/*
  Warnings:

  - You are about to drop the column `reviewedBy` on the `ChallengeSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game"."Challenge" ADD COLUMN     "rankId" TEXT;

-- AlterTable
ALTER TABLE "game"."ChallengeSubmission" DROP COLUMN "reviewedBy";

-- CreateTable
CREATE TABLE "game"."Rank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "video" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isUltimate" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rank_name_key" ON "game"."Rank"("name");

-- CreateIndex
CREATE INDEX "Challenge_rankName_idx" ON "game"."Challenge"("rankName");

-- CreateIndex
CREATE INDEX "ChallengeSubmission_userId_idx" ON "game"."ChallengeSubmission"("userId");

-- CreateIndex
CREATE INDEX "ChallengeSubmission_challengeId_idx" ON "game"."ChallengeSubmission"("challengeId");

-- AddForeignKey
ALTER TABLE "game"."Challenge" ADD CONSTRAINT "Challenge_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "game"."Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
