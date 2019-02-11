import express from 'express'

import {handle} from './handler'
import middlewares from './middlewares'
import * as auth from './controllers/Auth'
import * as client from './controllers/Client'
import * as quotation from './quotation/controller'
import * as user from './controllers/User'
import {authByLoginPassword} from './strategies/Local'
import {authByCookie} from './strategies/Cookie'

const URL = String(process.env.URL || 'http://localhost')
const PORT = Number(process.env.PORT || 3001)

// --------------------------------------------------------------------- # API #

const api = express()

api.enable('trust proxy')
api.use(...middlewares)

// Auth
api.post('/register', handle(auth.register))
api.post('/login', authByLoginPassword, handle(auth.login))

// Client
api.get('/client', authByCookie, handle(client.readAll))
api.post('/client', authByCookie, handle(client.create))
api.put('/client', authByCookie, handle(client.update))

// Quotation
api.get('/quotation', authByCookie, handle(quotation.readAll))
api.post('/quotation', authByCookie, handle(quotation.create))

// User
api.get('/user', authByCookie, handle(user.read))
api.post('/user', authByCookie, handle(user.update))

// ----------------------------------------------------------------- # Exports #

export function start() {
  api.listen(PORT, () => {
    const env = process.env.NODE_ENV || ''
    console.log(`[${env.toUpperCase()}] FactAE API started at ${URL}:${PORT}`)
  })
}

export function handleError(error: Error) {
  console.error('Error while starting API')
  console.error(error)

  process.exit(1)
}
