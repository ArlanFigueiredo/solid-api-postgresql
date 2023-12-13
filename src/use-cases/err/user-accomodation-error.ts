export class UserAccomodationExistsError extends Error {
  constructor() {
    super('You cannot book your own accommodation.')
  }
}
