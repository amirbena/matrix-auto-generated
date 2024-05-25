import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Logger, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "../..//auth/auth.guard";
import { SignGuard } from "../..//sign/sign.guard";
import { SIGN_HEADER } from "../../constants";
import { Response } from "express";
import { CalculatorService } from "../../services/calculator.service";
import { CalculationInfo } from "../../api/structures/CalculationInfo";


@Controller('/calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) { }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, SignGuard)
  @HttpCode(HttpStatus.OK)
  async calculation(@Body() calculationInfo: CalculationInfo, @Headers(SIGN_HEADER) signHeader: string) {
    Logger.log(`Calculation enterd`);
    return this.calculatorService.calculation(signHeader, calculationInfo);
  }

  @Get('/token')
  async signToken(@Res({ passthrough: true }) response: Response) {
    return await this.calculatorService.createToken(response);
  }
}