import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionFilterService } from './transaction-filter.service';
import { CreateTransactionFilterDto } from './dto/create-transaction-filter.dto';
import { UpdateTransactionFilterDto } from './dto/update-transaction-filter.dto';

@Controller('transaction-filter')
export class TransactionFilterController {
  constructor(private readonly transactionFilterService: TransactionFilterService) {}

  @Post()
  create(@Body() createTransactionFilterDto: CreateTransactionFilterDto) {
    return this.transactionFilterService.create(createTransactionFilterDto);
  }

  @Get()
  findAll() {
    return this.transactionFilterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionFilterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionFilterDto: UpdateTransactionFilterDto) {
    return this.transactionFilterService.update(+id, updateTransactionFilterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionFilterService.remove(+id);
  }
}
