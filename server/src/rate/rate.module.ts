import { Student } from './../student/entities/student.entity';
import { Homework } from './../homework/entities/homework.entity';
import { Rate } from "../rate/entities/rate.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Rate, Homework, Student])],
  controllers: [RateController],
  providers: [RateService],
  exports:[RateService]
})
export class RateModule {}
