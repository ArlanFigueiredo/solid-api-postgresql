export class AccomodationDoesNotExistError extends Error {
  constructor() {
    super('Accomodation does not exists.')
  }
}
