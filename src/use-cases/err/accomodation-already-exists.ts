export class AccomodationAlreadyExistsError extends Error {
  constructor() {
    super('Accomodation already exists.')
  }
}
