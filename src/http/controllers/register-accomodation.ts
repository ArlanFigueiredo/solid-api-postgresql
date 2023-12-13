import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/accomodation/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaAccomodationRepository } from '@/repositories/prisma/prisma-accomodation-repository'
import { UserDoesNotExistError } from '@/use-cases/err/user-does-not-exist'
import { AccomodationAlreadyExistsError } from '@/use-cases/err/accomodation-already-exists'
import { UserAlreadyAccomodationExistsError } from '@/use-cases/err/user-alredy-accomodation-exists'

export async function registerAccomodation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    type: z.string(),
    cep: z.number(),
    road: z.string(),
    number: z.number(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    number_max_hospedes: z.number(),
    number_room: z.number(),
    number_bathroom: z.number(),
    value_weekend: z.number(),
    value_daily_hospedes: z.number(),
  })
  const userIdBodySchema = z.object({
    user_id: z.string(),
  })

  const {
    name,
    type,
    cep,
    road,
    number,
    neighborhood,
    city,
    state,
    number_max_hospedes,
    number_room,
    number_bathroom,
    value_weekend,
    value_daily_hospedes,
  } = registerBodySchema.parse(request.body)

  const { user_id } = userIdBodySchema.parse(request.params)

  try {
    const userRepository = new PrismaUsersRepository()
    const accomodationRepository = new PrismaAccomodationRepository()

    const registerUseCase = new RegisterUseCase(
      userRepository,
      accomodationRepository,
    )

    await registerUseCase.execute({
      name,
      type,
      cep,
      road,
      number,
      neighborhood,
      city,
      state,
      number_max_hospedes,
      number_room,
      number_bathroom,
      value_weekend,
      value_daily_hospedes,
      user_id,
    })
    return reply.status(201).send({
      successfuly: 'Criado com sucesso',
    })
  } catch (error) {
    if (
      error instanceof UserDoesNotExistError ||
      error instanceof AccomodationAlreadyExistsError ||
      error instanceof UserAlreadyAccomodationExistsError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    reply.status(500).send()
  }
}
