import { prisma } from '@/lib/prisma'
import { Accomodation, Prisma } from '@prisma/client'
import { AccomodationRepository } from '../accomodation-repository'

export class PrismaAccomodationRepository implements AccomodationRepository {
  async findAccomodationById(id: string): Promise<Accomodation | null> {
    const accomodation = await prisma.accomodation.findUnique({
      where: {
        id,
      },
    })
    return accomodation
  }

  async findAccomodationByUser(user_id: string): Promise<Accomodation | null> {
    const accomodation = await prisma.accomodation.findUnique({
      where: {
        user_id,
      },
    })
    return accomodation
  }

  async findByName(name: string): Promise<Accomodation | null> {
    const accomodation = await prisma.accomodation.findUnique({
      where: {
        name,
      },
    })
    return accomodation
  }

  async create(data: Prisma.AccomodationCreateManyInput) {
    const accomodation = await prisma.accomodation.create({
      data,
    })
    return accomodation
  }
}
