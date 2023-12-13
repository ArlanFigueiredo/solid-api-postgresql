import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './err/users-already-exists'
import type { User } from '@prisma/client'

// Interface que vai ser usada pra tipar o tipo de dado a ser enviado no metodo execute
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// Interface que vai ser usada como tipo de retorno que vamos ter do metodo execute.
interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // UsersRepository = inteface
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
