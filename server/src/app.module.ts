import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetClass } from './asset_class/asset_class.entity';
import { AssetClassModule } from './asset_class/asset_class.module';
import { Customer } from './customer/customer.entity';
import { CustomerModule } from './customer/customer.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'luisribeiro',
      password: 'luisribeiro',
      database: 'assetallocator',
      entities: [AssetClass, Customer],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        return new Error(error.message);
      },
    }),
    AssetClassModule,
    CustomerModule,
  ],
})
export class AppModule {}
