/*
  Warnings:

  - You are about to drop the column `detailsSsupport` on the `adoptionrequests` table. All the data in the column will be lost.
  - Added the required column `detailsSupport` to the `adoptionrequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptionrequests" DROP COLUMN "detailsSsupport",
ADD COLUMN     "detailsSupport" TEXT NOT NULL;
