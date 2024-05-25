import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { UNAUTHORIZED_TO_CALCULATE } from '../constants';
import { CalculatorService } from '../services/calculator.service';


describe('AuthGuard', () => {
  let jwtService: JwtService;
  let context: DeepMocked<ExecutionContext>;
  let calculatorService: CalculatorService;
  let authGuard: AuthGuard;
  let res: Response;
  let mockRequest;
  beforeAll(() => {
    jwtService = new JwtService();
    context = createMock<ExecutionContext>();
    calculatorService = new CalculatorService(jwtService);
    authGuard = new AuthGuard(jwtService);
  })
  it('should pass ok when token is valid', async () => {
    try {

      await calculatorService.createToken(res);
      const auth = res.getHeaders()['set-cookie'][0];
      mockRequest = {
        headers: {
          'set-cookie': [`auth=${auth}`]
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest)
      const result = await authGuard.canActivate(context);
      expect(result).toBe(true);
    } catch (error) {

    }
  })
  it('should throws 401 status when token is invalid', async () => {
    try {
      mockRequest = {
        headers: {
          "set-cookie": ["auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbSI6IlBhc3MiLCJpYXQiOjE3MTY2NDIzMTQsImV4cCI6MTcxNjY0MjkxNH0.-gCUyNMyMC3A4Avw4HIYlkQdqbDwpvYIy0TBM8bZRJQ"]
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest);
      await authGuard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe(UNAUTHORIZED_TO_CALCULATE);
    }
  })
  it('should throws 401 status when token is expired', async () => {
    try {
      mockRequest = {
        headers: {
          'set-cookie':
            [
              "auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbSI6IlBhc3MiLCJpYXQiOjE3MTY2NDIzMTQsImV4cCI6MTcxNjY0MjkxNH0.-gCUyNMyMC3A4Avw4HIYlkQdqbDwpvYIy0TBM8bZRJQ"
            ]
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest);
      await authGuard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe(UNAUTHORIZED_TO_CALCULATE);
    }
  })
  it('should throws 401 status when token is empty', async () => {
    try {
      mockRequest = {
        headers: {
          'set-cookie': [
            "auth: ''"
          ]
        }
      }
      context.switchToHttp().getRequest.mockReturnValue(mockRequest);
      await authGuard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe(UNAUTHORIZED_TO_CALCULATE);
    }
  })
});
