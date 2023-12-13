import { Accomodation } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { AccomodationRepository } from '@/repositories/accomodation-repository'
import { UserDoesNotExistError } from '../err/user-does-not-exist'
import { AccomodationAlreadyExistsError } from '../err/accomodation-already-exists'
import { UserAlreadyAccomodationExistsError } from '../err/user-alredy-accomodation-exists'

interface RegisterUseCaseRequest {
  name: string
  cep: number
  type: string
  road: string
  number: number
  neighborhood: string
  city: string
  state: string
  number_max_hospedes: number
  number_room: number
  number_bathroom: number
  value_weekend: number
  value_daily_hospedes: number
  user_id: string
}

interface RegisterUseCaseResponse {
  accomodation: Accomodation
}

export class RegisterUseCase {
  constructor(
    private userRepository: UsersRepository,
    private accomodationRepository: AccomodationRepository,
  ) {}

  async execute({
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const user = await this.userRepository.findById(user_id)

    const accomodationExists =
      await this.accomodationRepository.findByName(name)

    const accomodationByUser =
      await this.accomodationRepository.findAccomodationByUser(user_id)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    if (accomodationExists) {
      throw new AccomodationAlreadyExistsError()
    }

    if (accomodationByUser) {
      throw new UserAlreadyAccomodationExistsError()
    }

    const accomodation = await this.accomodationRepository.create({
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
    return {
      accomodation,
    }
  }
}
