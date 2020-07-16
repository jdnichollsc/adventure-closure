import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { get, isEmpty } from 'lodash'

import { User } from '../models/user'
import { AuthToken, AuthPayload } from '../models/auth'
import { UserService, RoleService } from '../repositories'
import { ERRORS } from '../constants'
import { comparePassword } from './utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}

  async validateUser(document: string, password: string): Promise<User> {
    const user = await this.userService.findByDocument(document)
    if (!user) return null
    else if (!isEmpty(user.password)) {
      const matchPassword = await comparePassword(password, user.password)
      if (matchPassword) {
        user.role = await this.roleService.findById(user.role.id)
        delete user.password
        return user
      }
    }
    throw new UnauthorizedException(ERRORS.USER_INVALID_PASSWORD)
  }

  async getAccessToken(user: User): Promise<AuthToken> {
    const role = get(user, 'role.id')
    const payload: AuthPayload = { sub: user.id, role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
