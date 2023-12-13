import { PrismaAccomodationRepository } from '@/repositories/prisma/prisma-accomodation-repository'
import { PrismaReservationRepository } from '@/repositories/prisma/prisma-reservation-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AccomodationDoesNotExistError } from '@/use-cases/err/accomodation-does-not-exists'
import { ReservationAlredyExistError } from '@/use-cases/err/reservation-already-exists-error'
import { UserAccomodationExistsError } from '@/use-cases/err/user-accomodation-error'
import { UserDoesNotExistError } from '@/use-cases/err/user-does-not-exist'
import { RegisterUseCase } from '@/use-cases/reservation/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function registerReservation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerReservationBodySchema = z.object({
    date_checkin: z.string(),
    date_checkout: z.string(),
    created_at: z.string(),
    number_hospedes: z.number(),
    number_days: z.number(),
    value_max: z.number(),
  })

  const registerReservationBodySchemaIds = z.object({
    user_id: z.string(),
    accomodation_id: z.string(),
  })
  const {
    date_checkin,
    date_checkout,
    created_at,
    number_hospedes,
    number_days,
    value_max,
  } = registerReservationBodySchema.parse(request.body)

  const { accomodation_id, user_id } = registerReservationBodySchemaIds.parse(
    request.params,
  )
  // const checkin = date.format(new Date(date_checkin), 'YYYY/MM/DD')
  try {
    const reservationRepository = new PrismaReservationRepository()
    const accomodationRepository = new PrismaAccomodationRepository()
    const userRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(
      reservationRepository,
      accomodationRepository,
      userRepository,
    )

    const reservation = await registerUseCase.execute({
      date_checkin,
      date_checkout,
      created_at,
      number_hospedes,
      number_days,
      value_max,
      user_id,
      accomodation_id,
    })
    return reply.status(201).send(reservation)
  } catch (error) {
    if (
      error instanceof UserDoesNotExistError ||
      error instanceof UserAccomodationExistsError ||
      error instanceof AccomodationDoesNotExistError ||
      error instanceof ReservationAlredyExistError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    return reply.status(500).send()
  }
}
