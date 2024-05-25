import { CanActivate, ConflictException, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { SIGN_HEADER_INVALID_EXPECTION, SIGN_HEADER_EMPTY, SIGN_HEADER, validSignsArray } from '../constants';

@Injectable()
export class SignGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const signHeader = request.headers[SIGN_HEADER];
    if (!signHeader) throw new NotFoundException(SIGN_HEADER_EMPTY);
    if (!validSignsArray.includes(signHeader as string)) throw new ConflictException(SIGN_HEADER_INVALID_EXPECTION);
    return true;
  }
}
