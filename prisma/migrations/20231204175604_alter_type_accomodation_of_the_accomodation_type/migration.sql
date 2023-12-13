/*
  Warnings:

  - You are about to drop the column `type_accomodation` on the `accomodation` table. All the data in the column will be lost.
  - Added the required column `accomodation_type` to the `accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accomodation" DROP COLUMN "type_accomodation",
ADD COLUMN     "accomodation_type" TEXT NOT NULL;
