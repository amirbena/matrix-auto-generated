import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TOKEN_KEY, UNAUTHORIZED_TO_CALCULATE } from '../constants';

/**
 * Build Auth Guard for checking JWT VIA COOKIE
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const { auth } = request.cookies; // take auth cookie
      const result = await this.jwtService.verifyAsync(auth, { secret: TOKEN_KEY });
      if (result) return true;
      throw new Error(UNAUTHORIZED_TO_CALCULATE); // Pass to catch, in order to send 401 status to token
    } catch (error) {
      Logger.error(`AuthGuard->canActivite got error: ${(error as Error).message}`);
      throw new UnauthorizedException(UNAUTHORIZED_TO_CALCULATE); // Token invalid or expired.
    }
  }
}
