import { ApiProperty } from "@nestjs/swagger"

export class CreateHomeworkDto {
    @ApiProperty()
    name: string;

  
    @ApiProperty()
    groupId: number;
}
