import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AssetClass } from 'asset_class/asset_class.entity';
import { ValidationError } from 'apollo-server-express';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerInput, GetCustomerInput } from './dto/customer.dto';

/**
 * Customer Resolver
 */
@Resolver(() => Customer)
export class CustomerResolver {
  /**
   * Constructor for customer resolver
   * @param allocationService Injected service for customer
   */
  constructor(private customerService: CustomerService) {}

  /**
   * Creates a customer
   * @param createAllocationInput Input
   * @returns Customer created
   */
  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerInput);
  }

  /**
   * Gets all customers
   * @returns Collection of customers
   */
  @Query(() => [Customer])
  customers(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  /**
   * Gets a specific customer
   * @param getCustomerInput Input
   * @returns Customer
   */
  @Query(() => Customer)
  async customer(
    @Args('getCustomerInput') getCustomerInput: GetCustomerInput,
  ): Promise<Customer> {
    const customer = await this.customerService.getCustomer(getCustomerInput);
    if (!customer)
      throw new ValidationError(
        `Customer id ${getCustomerInput.id} doesn't exist`,
      );
    return customer;
  }

  /**
   * Gets asset classes related to customer
   * @param customer Customer
   * @returns Collection of Asset Class
   */
  @ResolveField(() => [AssetClass])
  async assetClasses(@Parent() customer: Customer): Promise<AssetClass[]> {
    return this.customerService.getAssetClasses(customer.id);
  }
}
