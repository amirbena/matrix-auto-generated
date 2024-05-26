import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Logger, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "../..//auth/auth.guard";
import { SignGuard } from "../..//sign/sign.guard";
import { SIGN_HEADER } from "../../constants";
import { Response } from "express";
import { CalculatorService } from "../../services/calculator.service";
import { CalculationInfo } from "../../api/structures/CalculationInfo";
import { Utils } from "../../utils";
import { CalculationInfoResult } from "../../api/structures/CalculationInfoResult";


@Controller('/calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) { }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, SignGuard)
  @HttpCode(HttpStatus.OK)
  async calculation(@Body() calculationInfo: CalculationInfo, @Headers(SIGN_HEADER) signHeader: string): Promise<CalculationInfoResult> {
    Logger.log(`CalculatorController->calculation() enterd with  calculation Info: ${Utils.toString(calculationInfo)}, and Sign Header: ${signHeader}`);
    const result = this.calculatorService.calculation(signHeader, calculationInfo);
    Logger.log(`CalculatorController->calculation() got calculation Result: ${Utils.toString(result)}`);
    return result;
  }

  @Get('/token')
  async signToken(@Res({ passthrough: true }) response: Response): Promise<void> {
    return await this.calculatorService.createToken(response);
  }
}