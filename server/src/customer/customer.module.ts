import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationModule } from 'allocation/allocation.module';
import { CustomerService } from 'customer/customer.service';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => AllocationModule),
  ],
  providers: [CustomerService, CustomerResolver, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
