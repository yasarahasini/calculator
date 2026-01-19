import { Controller, Post, Body, Get } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private service: CalculatorService) {}

  @Post()
  calculate(@Body() dto: CreateCalculationDto) {
    return this.service.calculate(dto);
  }

  @Get()
  history() {
    return this.service.findAll();
  }
}
