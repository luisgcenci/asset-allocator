import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Customer } from 'customer/customer.entity';
import {
  CreateCustomerInput,
  GetCustomerInput,
  GetCustomerByUsernameInput,
} from './dto/customer.dto';
import { CustomerRepository } from './customer.repository';
import { ValidationError } from 'apollo-server-express';
import { Allocation } from 'allocation/allocation.entity';
import { AllocationService } from 'allocation/allocation.service';

/**
 * Customer Service
 */
@Injectable()
export class CustomerService {
  private logger: Logger;

  /**
   * Constructor for Customer Service
   * @param customerRepository Injected Customer Repository
   */
  constructor(
    @Inject(CustomerRepository)
    private customerRepository: CustomerRepository,
    @Inject(forwardRef(() => AllocationService))
    private allocationService: AllocationService,
  ) {
    this.logger = new Logger();
  }

  /**
   * Creates a customer
   * @param createCustomerInput Input
   * @returns Customer created
   */
  async createCustomer(
    createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    const usernameExists = await this.usernameExists(createCustomerInput);
    if (usernameExists)
      throw new ValidationError(
        `Customer with username: '${createCustomerInput.username}' already exists.`,
      );

    let customer: Customer;

    try {
      customer = this.customerRepository.create(createCustomerInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while creating customer with username: '${createCustomerInput.username}' in Customer Table`,
      );
    }

    try {
      return this.customerRepository.save(customer);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while saving customer with username: '${customer.username}' in Customer Table`,
      );
    }
  }

  /**
   * Gets all customers
   * @returns Collection of customers
   */
  async getAllCustomers(): Promise<Customer[]> {
    try {
      return this.customerRepository.findAll();
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Error while retrieving all customers in Customer Table`);
    }
  }

  /**
   * Gets a customer
   * @param getCustomerInput Input
   * @returns A customer
   */
  async getCustomer(getCustomerInput: GetCustomerInput): Promise<Customer> {
    let customer: Customer;

    try {
      customer = await this.customerRepository.find(getCustomerInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while getting Customer with id: ${getCustomerInput.id} in Customer Table`,
      );
    }

    return customer;
  }

  /**
   * Checks if customer exists
   * @param getCustomerInput Input
   * @returns true if customer exists, false otherwise
   */
  async customerExists(getCustomerInput: GetCustomerInput): Promise<boolean> {
    const customer = await this.customerRepository.find(getCustomerInput);
    if (customer) return true;
    return false;
  }

  /**
   * Checks if username exists
   * @param getCustomerByUsernameInput Input
   * @returns true if username exists, false otherwise
   */
  async usernameExists(
    getCustomerByUsernameInput: GetCustomerByUsernameInput,
  ): Promise<boolean> {
    const customer = await this.customerRepository.find(
      getCustomerByUsernameInput,
    );
    if (customer) return true;
    return false;
  }

  /**
   * Gets all allocations related to a customer
   * @param customerId Customer ID
   * @returns Collection of allocations
   */
  async getAllocations(customerId: number): Promise<Allocation[]> {
    return this.allocationService.getAllocations({
      customerId: customerId,
    });
  }
}
