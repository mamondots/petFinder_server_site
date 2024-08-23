/*
  Warnings:

  - Added the required column `animalSleep` to the `adoptionrequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailsSsupport` to the `adoptionrequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petsHousehold` to the `adoptionrequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Unknown');

-- CreateEnum
CREATE TYPE "AnimelSleep" AS ENUM ('Outdoor', 'Indoor', 'Room', 'Garage', 'Crate');

-- AlterTable
ALTER TABLE "adoptionrequests" ADD COLUMN     "animalAlonePeriodsTime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "animalSleep" "AnimelSleep" NOT NULL,
ADD COLUMN     "detailsSsupport" TEXT NOT NULL,
ADD COLUMN     "petsHousehold" TEXT NOT NULL,
ADD COLUMN     "petsNeutered" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "secureOutdoorArea" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL;
