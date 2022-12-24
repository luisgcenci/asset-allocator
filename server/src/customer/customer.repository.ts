import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import {
  CreateCustomerInput,
  GetCustomerByUsernameInput,
  GetCustomerInput,
} from './dto/customer.dto';

/**
 * Customer Repository
 */
@Injectable()
export class CustomerRepository {
  private repository: Repository<Customer>;

  /**
   * Constructor for Customer Repository
   * @param dataSource Data source injected
   */
  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Customer);
  }

  /**
   * Creates a customer in the database
   * @param createCustomerInput Input
   * @returns Customer created
   */
  create(createCustomerInput: CreateCustomerInput): Customer {
    return this.repository.create(createCustomerInput);
  }

  /**
   * Saves a customer in the database
   * @param customer Customer
   * @returns Customer saved
   */
  async save(customer: Customer): Promise<Customer> {
    return await this.repository.save(customer);
  }

  /**
   * Finds all customers in the database
   * @returns A collection of customers found
   */
  async findAll(): Promise<Customer[]> {
    return await this.repository.find();
  }

  /**
   * Finds a single customer in the database
   * @param getCustomerInput Input
   * @returns Customer found or null
   */
  async find(
    getCustomerInput: GetCustomerInput | GetCustomerByUsernameInput,
  ): Promise<Customer> {
    return await this.repository.findOneBy(getCustomerInput);
  }
}
