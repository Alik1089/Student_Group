import { PartialType } from '@nestjs/mapped-types';
import { CreateGreatDto } from './create-great.dto';

export class UpdateGreatDto extends PartialType(CreateGreatDto) {}
