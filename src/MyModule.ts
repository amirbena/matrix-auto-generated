import { Module } from "@nestjs/common";

import { CalculatorController } from "./controllers/calculator/CalculatorController";
import { JwtModule } from "@nestjs/jwt";
import { CalculatorService } from "./services/calculator.service";
import { AuthGuard } from "./auth/auth.guard";
import { SignGuard } from "./sign/sign.guard";

@Module({
  imports: [JwtModule],
  controllers: [CalculatorController],
  providers: [CalculatorService, AuthGuard, SignGuard]
})
export class MyModule { }
