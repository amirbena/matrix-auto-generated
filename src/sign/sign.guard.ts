import { CanActivate, ConflictException, ExecutionContext, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { SIGN_HEADER_INVALID_EXPECTION, SIGN_HEADER_EMPTY, SIGN_HEADER, validSignsArray } from '../constants';

/**
 * Sign Guard checks if sign-header valid math sign
 */
@Injectable()
export class SignGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const signHeader = request.headers[SIGN_HEADER];
    if (!signHeader) {
      Logger.error(`SignGuard->canActivite got error: sign header not exist`);
      throw new NotFoundException(SIGN_HEADER_EMPTY);
    }
    if (!validSignsArray.includes(signHeader as string)) {
      Logger.error(`SignGuard->canActivite got error: sign header invalid`);
      throw new ConflictException(SIGN_HEADER_INVALID_EXPECTION);
    }
    return true;
  }
}
