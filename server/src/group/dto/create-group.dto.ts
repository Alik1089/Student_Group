import { ApiProperty } from "@nestjs/swagger"

export class CreateGroupDto {
    @ApiProperty()
    name:string
  
    @ApiProperty()
    count:number

    @ApiProperty()
    moduleId:number

    @ApiProperty()
    teacherId:number
}
