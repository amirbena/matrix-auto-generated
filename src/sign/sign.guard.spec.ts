import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ConflictException, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SIGN_HEADER, SIGN_HEADER_EMPTY, SIGN_HEADER_INVALID_EXPECTION } from '../constants';
import { SignGuard } from './sign.guard';


describe('SignGuard', () => {
  let context: DeepMocked<ExecutionContext>;
  let signGuard: SignGuard;
  let mockRequest;
  beforeAll(() => {
    context = createMock<ExecutionContext>();
    signGuard = new SignGuard();
  })
  it('should pass ok when sign is valid math sign', async () => {
    try {
      mockRequest = {
        headers: {
          [SIGN_HEADER]: "+"
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest)
      const result = await signGuard.canActivate(context);
      expect(result).toBe(true);
    } catch (error) {

    }
  })
  it('should throws 404 status when sign is empty', async () => {
    try {
      mockRequest = {
        headers: {
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest);
      await signGuard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect((error as NotFoundException).message).toBe(SIGN_HEADER_EMPTY);
    }
  })
  it('should throws 409 status when sign is invalid math sign', async () => {
    try {
      mockRequest = {
        headers: {
          [SIGN_HEADER]: ")"
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest);
      await signGuard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect((error as ConflictException).message).toBe(SIGN_HEADER_INVALID_EXPECTION);
    }
  })
});
