import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { registerAccomodation } from './controllers/register-accomodation'
import { authenticate } from './controllers/autenticate'
import { registerReservation } from './controllers/register-reservation'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/authenticate', authenticate)
  app.post('/accomodation/:user_id', registerAccomodation)
  app.post('/reservation/:accomodation_id/:user_id', registerReservation)
}
