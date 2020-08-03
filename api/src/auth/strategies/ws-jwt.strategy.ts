import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { AUTH_SECRET_TOKEN } from '../../constants'
import { AuthPayload } from '../../models'

/**
 * WsJwtStrategy is passport WS-JWT strategy.
 * 
 * @export
 * @class WsJwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET_TOKEN,
    })
  }

  /**
   * validate returns jwt payload.
   * @param payload - Payload with the info of the user
   * 
   * @returns
   * @memberof WsJwtStrategy
   */
  validate(payload: AuthPayload): AuthPayload {
    return payload
  }
}