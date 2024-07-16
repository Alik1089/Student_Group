import { Module } from '@nestjs/common';
import { GreatService } from './great.service';
import { GreatController } from './great.controller';

@Module({
  controllers: [GreatController],
  providers: [GreatService],
})
export class GreatModule {}
