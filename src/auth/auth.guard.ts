import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TOKEN_KEY, UNAUTHORIZED_TO_CALCULATE } from '../constants';
import { MyGlobal } from 'src/MyGlobal';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const { auth } = request.cookies;
      const result = await this.jwtService.verifyAsync(auth, { secret: TOKEN_KEY });
      if (result) return true;
      throw new Error();
    } catch (error) {
      throw new UnauthorizedException(UNAUTHORIZED_TO_CALCULATE);
    }
  }
}
