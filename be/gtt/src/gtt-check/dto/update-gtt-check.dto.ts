import { PartialType } from '@nestjs/mapped-types';
import { CreateGttCheckDto } from './create-gtt-check.dto';

export class UpdateGttCheckDto extends PartialType(CreateGttCheckDto) {}
