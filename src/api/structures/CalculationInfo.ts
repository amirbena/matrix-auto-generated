import { IsNotEmpty, IsNumber } from "class-validator";


export class CalculationInfo {
    @IsNotEmpty()
    @IsNumber() 
    number1: number;

    @IsNotEmpty()
    @IsNumber()
    number2: number;
}
