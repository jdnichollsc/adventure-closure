import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'

import { UserService, RoleService } from '../repositories'
import { User, Role } from '../models'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  const userService = { findByDocument: jest.fn(() => Promise.resolve(new User())) }
  const roleService = { findById: jest.fn(() => Promise.resolve(new Role())) }
  const jwtService = { sign: jest.fn(({ sub, role }) => sub + role) }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        UserService,
        RoleService,
        AuthService
      ],
    })
    .overrideProvider(JwtService).useValue(jwtService)
    .overrideProvider(UserService).useValue(userService)
    .overrideProvider(RoleService).useValue(roleService)
    .compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should validate user', () => {
    const document = '123'
    const password = '111'

    service.validateUser(document, password)
    
    expect(userService.findByDocument).toBeCalledWith(document)
  })

  it('should get access token', async () => {
    const userId = '123'
    const roleId = 111
    const user = new User(userId)
    user.role = new Role(roleId)
    const accessToken = userId + roleId

    const result = await service.getAccessToken(user)
    expect(result.access_token).toBe(accessToken)
    expect(jwtService.sign).toBeCalled()
  })
})
