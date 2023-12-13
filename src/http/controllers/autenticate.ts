import { InvalidCredentialError } from '@/use-cases/err/invalid-credentials-error'
import { AuthenticateUseCase } from './../../use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validando os dados ulitlizando a lib zod
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  // Capturando os dados do body ultilizando destruturing atráves da requisição http
  const { email, password } = authenticateBodySchema.parse(request.body)

  // Chamando uma função do use-case e tratando esse chamado com try-catch (trata os erros vindo do use-case (throw new Error))
  try {
    // Inversão de dependencia Use-case recebe o prisma como parametro, assim precisamos instanciar nosso use-case e primsaRepository e passar ele como parametro
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const authenticate = await authenticateUseCase.execute({
      email,
      password,
    })
    return reply.status(201).send({
      message: 'Authentication successfuly.',
      authenticate,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
}
