/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `accomodation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accomodation_name_key" ON "accomodation"("name");
