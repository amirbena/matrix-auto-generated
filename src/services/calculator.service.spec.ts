import { JwtModule } from "@nestjs/jwt";
import { CalculatorService } from "./calculator.service";
import { ConflictException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { CalculationInfoResult } from "../api/structures/CalculationInfoResult";
import { AUTH_COOKIE, DIVIDE_BY_ZERO, SIGN_HEADER_EMPTY, SIGN_HEADER_INVALID_EXPECTION } from "../constants";

describe('Calculator Service', () => {
    let calculatorService: CalculatorService;
    let number1: number, number2: number, expectedResult: number;
    let signHeader: string;
    let testResult: CalculationInfoResult;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule],
            providers: [CalculatorService],
        }).compile();

        calculatorService = module.get<CalculatorService>(CalculatorService);
    })
    describe("Calculation()", () => {
        it("should return result of adding between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "+";
            expectedResult = number1 + number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of power between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "^";
            expectedResult = Math.pow(number1, number2);
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of subtraction between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "-";
            expectedResult = number1 - number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of multiplication between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "*";
            expectedResult = number1 * number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of division between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "/";
            expectedResult = number1 / number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of and between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "&";
            expectedResult = number1 & number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of or between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "|";
            expectedResult = number1 | number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should return result of  modulo between 2 numbers", () => {
            number1 = 2;
            number2 = 4;
            signHeader = "%";
            expectedResult = number1 % number2;
            testResult = calculatorService.calculation(signHeader, { number1, number2 });
            expect(testResult).toStrictEqual({ result: expectedResult })
            expect(testResult.result).toBe(expectedResult)
        })
        it("should throw  ConflictException of division between 2 numbers that second number is zero", async () => {
            number1 = 2;
            number2 = 0;
            signHeader = "/";
            try {
                calculatorService.calculation(signHeader, { number1, number2 })
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException);
                expect((error as ConflictException).message).toBe(DIVIDE_BY_ZERO);
            }

        })
        it("should throw  ConflictException of modulo between 2 numbers that second number is zero", async () => {
            number1 = 2;
            number2 = 0;
            signHeader = "%";
            try {
                calculatorService.calculation(signHeader, { number1, number2 })
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException);
                expect((error as ConflictException).message).toBe(DIVIDE_BY_ZERO);
            }

        })
        it("should throw ConflictException of signHeader is empty", async () => {
            number1 = 2;
            number2 = 0;
            signHeader = "";
            try {
                calculatorService.calculation(signHeader, { number1, number2 })
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect((error as (NotFoundException)).message).toBe(SIGN_HEADER_EMPTY);
            }
        })
        it("should throw NotFoundException of signHeader notFound", async () => {
            number1 = 2;
            number2 = 0;
            signHeader = "(";
            try {
                calculatorService.calculation(signHeader, { number1, number2 })
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException);
                expect((error as (ConflictException)).message).toBe(SIGN_HEADER_INVALID_EXPECTION);
            }
        })
    })

    describe("createToken()", () => {
        let response: Response;
        it('createsToken in Cookie', async () => {
            try {
                await calculatorService.createToken(response);
                expect(response.statusCode).toBe(HttpStatus.OK);
                expect(response.getHeaders()).toContain(AUTH_COOKIE);
            } catch (error) {

            }
        })
    })
});
