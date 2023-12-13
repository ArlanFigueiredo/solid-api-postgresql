/*
  Warnings:

  - Added the required column `type` to the `accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accomodation" ADD COLUMN     "type" TEXT NOT NULL;
