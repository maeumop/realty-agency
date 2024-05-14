import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/api/auth/auth.service';
import { MemberService } from 'src/api/member/member.service';
import { PUBLIC_API_KEY } from 'src/decorator/public-api.decorator';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const raw = req.headers['authorization'];

    if (!raw) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = this.authService.getOnlyToken(raw, true);
    const { userId, pwd } = this.authService.decodeBasicToken(token);
    const member = await this.authService.login(userId, pwd);

    req.member = member;

    return true;
  }
}

/**
 * 해당 가드를 통해 토큰이 필요한 모든 API 에 guard를 재공하고
 * PublicAPI decorator가 있는 API 만 해당 가드의 규제를 받지 않는다.
 */
@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly memberSerivce: MemberService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_API_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();

    if (!isPublic) {
      const raw = req.headers['authorization'];

      if (!raw) {
        throw new UnauthorizedException('토큰이 없습니다.(Bearer guard)');
      }

      const token = this.authService.getOnlyToken(raw);
      const payload = await this.authService.verifyToken(token);
      const member = await this.memberSerivce.getMemberById(payload.userId);

      req.token = token;
      req.tokenType = payload.type;
      req.member = member;
    }

    req.isPublic = isPublic;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (!req.isPublic && req.tokenType !== 'access') {
      throw new UnauthorizedException('엑세스 토큰이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (!req.isPublic && req.tokenType !== 'refresh') {
      throw new UnauthorizedException('리프레시 토큰이 아닙니다.');
    }

    return true;
  }
}
