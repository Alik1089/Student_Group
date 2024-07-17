import { ApiProperty } from "@nestjs/swagger"

export class CreateStudentDto {
    @ApiProperty()
    userId:number
  
    @ApiProperty()
    groupId:number
}
