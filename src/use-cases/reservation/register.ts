import { PrismaReservationRepository } from '@/repositories/prisma/prisma-reservation-repository'
import { Reservation } from '@prisma/client'
import { ReservationAlredyExistError } from '../err/reservation-already-exists-error'
import { PrismaAccomodationRepository } from '@/repositories/prisma/prisma-accomodation-repository'
import { UserAccomodationExistsError } from '../err/user-accomodation-error'
import { AccomodationDoesNotExistError } from '../err/accomodation-does-not-exists'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserDoesNotExistError } from '../err/user-does-not-exist'

interface RegisterUseCaseRequest {
  date_checkin?: Date | string
  date_checkout?: Date | string
  created_at?: Date | string
  number_hospedes: number
  number_days: number
  value_max: number
  user_id: string
  accomodation_id: string
}

interface RegisterUseCaseResponse {
  reservation: Reservation
}

export class RegisterUseCase {
  constructor(
    private reservationRepository: PrismaReservationRepository,
    private accomodationRepository: PrismaAccomodationRepository,
    private userRepository: PrismaUsersRepository,
  ) {}

  async execute({
    date_checkin,
    date_checkout,
    created_at,
    number_hospedes,
    number_days,
    value_max,
    user_id,
    accomodation_id,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlredyExist = await this.userRepository.findById(user_id)

    const reservationAlredyExist =
      await this.reservationRepository.findReservationByUser(user_id)

    const accomodationByUser =
      await this.accomodationRepository.findAccomodationByUser(user_id)

    const accomodationById =
      await this.accomodationRepository.findAccomodationById(accomodation_id)

    if (accomodationByUser) {
      throw new UserAccomodationExistsError()
    }

    if (!userAlredyExist) {
      throw new UserDoesNotExistError()
    }

    if (!accomodationById) {
      throw new AccomodationDoesNotExistError()
    }

    if (reservationAlredyExist) {
      throw new ReservationAlredyExistError()
    }

    const reservation = await this.reservationRepository.create({
      date_checkin,
      date_checkout,
      created_at,
      number_hospedes,
      number_days,
      value_max,
      user_id,
      accomodation_id,
    })
    return {
      reservation,
    }
  }
}
