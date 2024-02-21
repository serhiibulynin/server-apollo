import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthentificationException } from 'src/common/exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isRmqContext = (context.getType() as string) === 'rmq';

    if (isRmqContext) return true;

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new AuthentificationException();
    if (token) {
      let payload;
      try {
        payload = await this.authService.verify(token);
      } catch {
        throw new AuthentificationException();
      }
      if (payload) {
        ctx.getContext().user = await this.userService.findOne(payload.id);
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
