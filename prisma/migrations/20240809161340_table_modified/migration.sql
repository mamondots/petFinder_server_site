/*
  Warnings:

  - You are about to drop the column `views` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `donations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "views",
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "currency";
