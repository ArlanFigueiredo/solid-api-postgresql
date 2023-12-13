export class ReservationAlredyExistError extends Error {
  constructor() {
    super('Reservation already exists.')
  }
}
