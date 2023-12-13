/*
  Warnings:

  - You are about to drop the column `type` on the `accomodation` table. All the data in the column will be lost.
  - Added the required column `type_accomodation` to the `accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accomodation" DROP COLUMN "type",
ADD COLUMN     "type_accomodation" TEXT NOT NULL;
