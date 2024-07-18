import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
    @ApiProperty()
    name:string
  
    @ApiProperty()
    count:number

    @ApiProperty()
    moduleId:number

    @ApiProperty()
    teacherId:number
}
