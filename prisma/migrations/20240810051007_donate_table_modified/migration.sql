/*
  Warnings:

  - You are about to drop the column `petId` on the `donations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_petId_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "petId";
