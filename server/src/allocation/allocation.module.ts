import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationService } from 'allocation/allocation.service';
import { CustomerModule } from 'customer/customer.module';
import { Allocation } from './allocation.entity';
import { AllocationRepository } from './allocation.repository';
import { AllocationResolver } from './allocation.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Allocation]),
    forwardRef(() => CustomerModule),
  ],
  providers: [AllocationService, AllocationResolver, AllocationRepository],
  exports: [AllocationService],
})
export class AllocationModule {}
