/*
  Warnings:

  - You are about to drop the `check_ins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gyms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gym_id_fkey";

-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_user_id_fkey";

-- DropTable
DROP TABLE "check_ins";

-- DropTable
DROP TABLE "gyms";

-- CreateTable
CREATE TABLE "accomodation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "road" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number_max_hospedes" INTEGER NOT NULL,
    "number_room" INTEGER NOT NULL,
    "number_bathroom" INTEGER NOT NULL,
    "value_weekend" INTEGER NOT NULL,
    "value_daily_hospedes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "accomodation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accomodation_user_id_key" ON "accomodation"("user_id");

-- AddForeignKey
ALTER TABLE "accomodation" ADD CONSTRAINT "accomodation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
