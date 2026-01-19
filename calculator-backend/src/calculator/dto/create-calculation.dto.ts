import { IsNumber, IsString } from 'class-validator';

export class CreateCalculationDto {
  @IsNumber()
  num1: number;

  @IsNumber()
  num2: number;

  @IsString()
  operator: string;
}
