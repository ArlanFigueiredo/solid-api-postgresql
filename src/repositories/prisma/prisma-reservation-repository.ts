import { Reservation, Prisma } from '@prisma/client'
import { ReservationRepistory } from '../reservation-repository'
import { prisma } from '@/lib/prisma'

export class PrismaReservationRepository implements ReservationRepistory {
  async findReservationByUser(user_id: string): Promise<Reservation | null> {
    const reservation = await prisma.reservation.findFirst({
      where: {
        user_id,
      },
    })
    return reservation
  }

  async create(data: Prisma.ReservationCreateManyInput): Promise<Reservation> {
    const reservation = await prisma.reservation.create({
      data,
    })
    return reservation
  }
}
