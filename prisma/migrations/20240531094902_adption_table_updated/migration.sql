/*
  Warnings:

  - The `animalAlonePeriodsTime` column on the `adoptionrequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `petsNeutered` column on the `adoptionrequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `secureOutdoorArea` column on the `adoptionrequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OpinionOption" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "adoptionrequests" DROP COLUMN "animalAlonePeriodsTime",
ADD COLUMN     "animalAlonePeriodsTime" "OpinionOption" NOT NULL DEFAULT 'NO',
DROP COLUMN "petsNeutered",
ADD COLUMN     "petsNeutered" "OpinionOption" NOT NULL DEFAULT 'YES',
DROP COLUMN "secureOutdoorArea",
ADD COLUMN     "secureOutdoorArea" "OpinionOption" NOT NULL DEFAULT 'YES';
