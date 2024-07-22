import { ApiProperty } from '@nestjs/swagger';

export class CreateRateDto {
  @ApiProperty()
  rate: number;

  @ApiProperty()
  homeworkId: number;

  @ApiProperty()
  studentId: number;
}
