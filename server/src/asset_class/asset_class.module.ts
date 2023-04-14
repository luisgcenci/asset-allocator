import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetClassService } from 'asset_class/asset_class.service';
import { CustomerModule } from 'customer/customer.module';
import { AssetClass } from './asset_class.entity';
import { AssetClassRepository } from './asset_class.repository';
import { AssetClassResolver } from './asset_class.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetClass]),
    forwardRef(() => CustomerModule),
  ],
  providers: [AssetClassService, AssetClassResolver, AssetClassRepository],
  exports: [AssetClassService],
})
export class AssetClassModule {}
