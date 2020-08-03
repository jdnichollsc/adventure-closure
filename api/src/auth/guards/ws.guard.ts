
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class WsGuard extends AuthGuard('ws-jwt') implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const wsContext = context.switchToWs();
    const client = wsContext.getClient();
    const token = client.handshake.query.token;

    const user = this.authService.getPayloadFromToken(token);
    client.user = user;

    return !!user;
  }

  getRequest (context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}