import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Allocation } from 'allocation/allocation.entity';
import {
  AllocationExistsInput,
  AllocationNameExistsInput,
  CreateAllocationInput,
  DeleteAllocationInput,
  GetAllocationInput,
  GetAllocationsInput,
  UpdateAllocationInput,
} from './dto/allocation.dto';
import { AllocationRepository } from './allocation.repository';
import { ValidationError } from 'apollo-server-express';
import { CustomerService } from 'customer/customer.service';
import { Customer } from 'customer/customer.entity';

/**
 * Allocation Service
 */
@Injectable()
export class AllocationService {
  private logger: Logger;

  /**
   * Constructor for Allocation Service
   * @param allocationRepository Injected Allocation Repository
   */
  constructor(
    @Inject(AllocationRepository)
    private allocationRepository: AllocationRepository,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
  ) {
    this.logger = new Logger();
  }

  /**
   * Creates an allocation
   * @param createAllocationInput Input
   * @returns Allocation created
   */
  async createAllocation(
    createAllocationInput: CreateAllocationInput,
  ): Promise<Allocation> {
    const customerExists = await this.customerService.customerExists({
      id: createAllocationInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${createAllocationInput.customerId}' doesn't exists.`,
      );

    const allocationNameExists = await this.nameExists(createAllocationInput);

    if (allocationNameExists)
      throw new ValidationError(
        `Allocation '${createAllocationInput.name}' already exists for customer ${createAllocationInput.customerId}.`,
      );

    let allocation: Allocation;

    try {
      allocation = this.allocationRepository.create(createAllocationInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while creating allocation with name: ${createAllocationInput.name} in Allocation Table`,
      );
    }

    try {
      return this.allocationRepository.save(allocation);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while saving allocation with name: ${allocation.name} in Allocation Table`,
      );
    }
  }

  /**
   * Gets all allocations
   * @param getAllocationsInput Input
   * @returns Collection of allocations
   */
  async getAllocations(
    getAllocationsInput: GetAllocationsInput,
  ): Promise<Allocation[]> {
    try {
      return this.allocationRepository.find(getAllocationsInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while retrieving allocations with customerId: ${getAllocationsInput.customerId} in Allocation Table`,
      );
    }
  }

  /**
   * Gets an allocation
   * @param getAllocationInput Input
   * @returns An allocation
   */
  async getAllocation(
    getAllocationInput: GetAllocationInput,
  ): Promise<Allocation> {
    try {
      return this.allocationRepository.findOne(getAllocationInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while retrieving allocation with name: ${getAllocationInput.name} in Allocation Table`,
      );
    }
  }

  /**
   * Updates an allocation
   * @param updateAllocationInput input
   * @returns Allocation updated
   */
  async updateAllocation(
    updateAllocationInput: UpdateAllocationInput,
  ): Promise<Allocation> {
    const customerExists = await this.customerService.customerExists({
      id: updateAllocationInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${updateAllocationInput.customerId}' doesn't exists.`,
      );

    const allocationExists = await this.allocationExists({
      customerId: updateAllocationInput.customerId,
      id: updateAllocationInput.id,
    });

    if (!allocationExists)
      throw new ValidationError(
        `Allocation with id: '${updateAllocationInput.id}' doesn't exists.`,
      );

    try {
      await this.allocationRepository.update(updateAllocationInput);
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while updating allocation with name: ${updateAllocationInput.name} in Allocation Table`,
      );
    }

    return this.getAllocation(updateAllocationInput);
  }

  /**
   * Deletes an allocation
   * @param deleteAllocationInput Input
   * @returns true if deletion was sucessfull
   */
  async deleteAllocation(
    deleteAllocationInput: DeleteAllocationInput,
  ): Promise<boolean> {
    const customerExists = await this.customerService.customerExists({
      id: deleteAllocationInput.customerId,
    });

    if (!customerExists)
      throw new ValidationError(
        `Customer with id: '${deleteAllocationInput.customerId}' doesn't exists.`,
      );

    const allocationExists = await this.allocationExists(deleteAllocationInput);

    if (!allocationExists)
      throw new ValidationError(
        `Allocation with id: '${deleteAllocationInput.id}' doesn't exists.`,
      );

    try {
      await this.allocationRepository.delete(deleteAllocationInput);
      return true;
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        `Error while deleting allocation with id: ${deleteAllocationInput.id} in Allocation Table`,
      );
    }
  }

  /**
   * Sum all allocations amounts
   * @param getAllocationsInput Input
   * @returns Sum of allocations amounts
   */
  async getAllocationsTotalAmount(
    getAllocationsInput: GetAllocationsInput,
  ): Promise<number> {
    const allocations = await this.getAllocations(getAllocationsInput);
    let sum = 0;

    allocations.forEach((a) => {
      sum += a.amount;
    });

    return sum;
  }

  /**
   * Checks if allocation exists
   * @param allocationExistsInput Input
   * @returns true if allocation exists, false otherwise
   */
  async allocationExists(
    allocationExistsInput: AllocationExistsInput,
  ): Promise<boolean> {
    const allocations = await this.allocationRepository.find(
      allocationExistsInput,
    );
    if (allocations.length > 0) return true;
    return false;
  }

  /**
   * Checks if allocation name exists
   * @param allocationExistsInput Input
   * @returns true if allocation name exists, false otherwise
   */
  async nameExists(
    allocationNameExistsInput: AllocationNameExistsInput,
  ): Promise<boolean> {
    const allocations = await this.allocationRepository.find(
      allocationNameExistsInput,
    );
    if (allocations.length > 0) return true;
    return false;
  }

  /**
   * Gets a customer
   * @param customerId Customer ID
   * @returns A customer
   */
  async getCustomer(customerId: number): Promise<Customer> {
    return await this.customerService.getCustomer({
      id: customerId,
    });
  }
}
