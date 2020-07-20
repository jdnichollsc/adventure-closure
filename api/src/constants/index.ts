import * as jwt from 'jsonwebtoken'

export const PORT = +process.env.PORT || 3000
export const WEBSOCKET_PORT = +process.env.WEBSOCKET_PORT || 80
export const PROD_ENV = 'production'
export const DOMAIN = process.env.NODE_ENV === PROD_ENV ?
  'https://my-production-api.domain'
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
  MANAGER: 'MANAGER_REPOSITORY'
}

export { default as ERRORS } from './errors'
export * as POSTGRES from './postgres'
