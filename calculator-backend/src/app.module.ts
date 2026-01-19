import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'calculator_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CalculatorModule,
  ],
})
export class AppModule {}
