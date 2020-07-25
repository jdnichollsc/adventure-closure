import * as jwt from 'jsonwebtoken'

export const PROD_ENV = 'production'
export const IS_PROD = process.env.NODE_ENV === PROD_ENV
export const PORT = Number(process.env.PORT) || 3000
export const WEBSOCKET_PORT = Number(process.env.WEBSOCKET_PORT) || (IS_PROD ? undefined : 80)
export const DOMAIN = process.env.NODE_ENV === PROD_ENV ?
  'https://proyecto-26-244415.ue.r.appspot.com'
  : `http://localhost:${PORT}`

export const AUTH_SECRET_TOKEN = 'my_secret_token';
export const AUTH_JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: '1d'
};

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
export const REPOSITORIES = {
  USER: 'USER_REPOSITORY',
  ROLE: 'ROLE_REPOSITORY',
  BUSINESS: 'BUSINESS_REPOSITORY',
  USER_BUSINESS: 'USER_BUSINESS_REPOSITORY',
  MANAGER: 'MANAGER_REPOSITORY'
}

export { default as ERRORS } from './errors'
export * as POSTGRES from './postgres'
