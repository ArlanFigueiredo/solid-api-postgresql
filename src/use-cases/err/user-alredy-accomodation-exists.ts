export class UserAlreadyAccomodationExistsError extends Error {
  constructor() {
    super('You cannot have more than one accommodation registered.')
  }
}
