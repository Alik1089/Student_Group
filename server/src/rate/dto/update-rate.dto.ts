import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRateDto } from './create-rate.dto';

export class UpdateRateDto extends PartialType(CreateRateDto) {
    @ApiProperty()
    rate: number;
    @ApiProperty()
    homeworkId: number;
  
    @ApiProperty()
    studentId: number;
}
