import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from './allocation/allocation.entity';
import { AllocationModule } from './allocation/allocation.module';
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
      entities: [Allocation, Customer],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        return new Error(error.message);
      },
    }),
    AllocationModule,
    CustomerModule,
  ],
})
export class AppModule {}
