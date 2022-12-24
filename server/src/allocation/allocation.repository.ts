import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Allocation } from './allocation.entity';
import {
  CreateAllocationInput,
  DeleteAllocationInput,
  GetAllocationInput,
  GetAllocationsInput,
  UpdateAllocationInput,
} from './dto/allocation.dto';

/**
 * Allocation Repository
 */
@Injectable()
export class AllocationRepository {
  private repository: Repository<Allocation>;

  /**
   * Constructor for Allocation Repository
   * @param dataSource Data source injected
   */
  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Allocation);
  }

  /**
   * Creates an allocation in the database
   * @param createAllocationInput Input
   * @returns Allocation created
   */
  create(createAllocationInput: CreateAllocationInput): Allocation {
    return this.repository.create(createAllocationInput);
  }

  /**
   * Saves an allocation in the database
   * @param allocation Allocation
   * @returns Allocation saved
   */
  async save(allocation: Allocation): Promise<Allocation> {
    return await this.repository.save(allocation);
  }

  /**
   * Finds all allocations in the database
   * @param getAllocationsInput Input
   * @returns A collection of allocations found
   */
  async find(getAllocationsInput: GetAllocationsInput): Promise<Allocation[]> {
    return await this.repository.findBy(getAllocationsInput);
  }

  /**
   * Finds a single allocation in the database
   * @param getAllocationInput Input
   * @returns Allocation found or null
   */
  async findOne(getAllocationInput: GetAllocationInput): Promise<Allocation> {
    return await this.repository.findOneBy(getAllocationInput);
  }

  /**
   * Updates an allocation in the database
   * @param updateAllocationInput Input
   * @returns void
   */
  async update(updateAllocationInput: UpdateAllocationInput) {
    await this.repository.update(
      {
        id: updateAllocationInput.id,
        customerId: updateAllocationInput.customerId,
      },
      updateAllocationInput,
    );
  }

  /**
   * Deletes an allocation in the database
   * @param deleteAllocationInput Input
   * @returns void
   */
  async delete(deleteAllocationInput: DeleteAllocationInput) {
    await this.repository.delete(deleteAllocationInput);
  }
}
