import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/err/users-already-exists'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Validando os dados ulitlizando a lib zod
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  // Capturando os dados do body ultilizando destruturing atráves da requisição http
  const { name, email, password } = registerBodySchema.parse(request.body)

  // Chamando uma função do use-case e tratando esse chamado com try-catch (trata os erros vindo do use-case (throw new Error))
  try {
    // Inversão de dependencia Use-case recebe o prisma como parametro, assim precisamos instanciar nosso use-case e primsaRepository e passar ele como parametro
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
    reply.status(500).send()
  }

  return reply.status(201).send({
    message: 'User registerd successfuly.',
  })
}
