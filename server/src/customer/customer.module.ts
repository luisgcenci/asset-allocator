import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetClassModule } from 'asset_class/asset_class.module';
import { CustomerService } from 'customer/customer.service';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => AssetClassModule),
  ],
  providers: [CustomerService, CustomerResolver, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
