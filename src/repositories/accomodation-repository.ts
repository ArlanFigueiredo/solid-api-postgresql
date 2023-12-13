import { Prisma, Accomodation } from '@prisma/client'

export interface AccomodationRepository {
  findAccomodationById(id: string): Promise<Accomodation | null>
  findAccomodationByUser(user_id: string): Promise<Accomodation | null>
  findByName(name: string): Promise<Accomodation | null>
  create(data: Prisma.AccomodationCreateManyInput): Promise<Accomodation>
}
