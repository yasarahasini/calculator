import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from './entities/calculation.entity';
import { CreateCalculationDto } from './dto/create-calculation.dto';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculation)
    private repo: Repository<Calculation>,
  ) {}

  async calculate(dto: CreateCalculationDto) {
    const { num1, num2, operator } = dto;
    let result: number;

    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/':
        if (num2 === 0) throw new BadRequestException('Division by zero');
        result = num1 / num2;
        break;
      default:
        throw new BadRequestException('Invalid operator');
    }

    const calculation = this.repo.create({
      num1,
      num2,
      operator,
      result,
    });

    return this.repo.save(calculation);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
