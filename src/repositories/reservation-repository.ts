import { Prisma, Reservation } from '@prisma/client'

export interface ReservationRepistory {
  findReservationByUser(user_id: string): Promise<Reservation | null>
  create(data: Prisma.ReservationCreateManyInput): Promise<Reservation>
}
