import { Prisma, User } from '@prisma/client'

// INTERFACE DEFINE O QUE O CONTRATO DO CODIGO EXIGE NO CASO FINDBYEMAIL E CREATE QUE SÃO METODOS
export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
