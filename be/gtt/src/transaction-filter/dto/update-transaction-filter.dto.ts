import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionFilterDto } from './create-transaction-filter.dto';

export class UpdateTransactionFilterDto extends PartialType(CreateTransactionFilterDto) {}
