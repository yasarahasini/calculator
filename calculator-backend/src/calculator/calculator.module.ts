import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { Calculation } from './entities/calculation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calculation])],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
