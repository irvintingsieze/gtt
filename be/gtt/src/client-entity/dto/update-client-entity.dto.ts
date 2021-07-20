import { PartialType } from '@nestjs/mapped-types';
import { CreateClientEntityDto } from './create-client-entity.dto';

export class UpdateClientEntityDto extends PartialType(CreateClientEntityDto) {}
