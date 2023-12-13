-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "date_checkin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_checkout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number_hospedes" INTEGER NOT NULL,
    "number_days" INTEGER NOT NULL,
    "value_max" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "accomodation_id" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_accomodation_id_fkey" FOREIGN KEY ("accomodation_id") REFERENCES "accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
