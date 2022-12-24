import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Customer } from 'customer/customer.entity';
import { Allocation } from './allocation.entity';
import { AllocationService } from './allocation.service';
import {
  CreateAllocationInput,
  DeleteAllocationInput,
  GetAllocationsInput,
  UpdateAllocationInput,
} from './dto/allocation.dto';

/**
 * Allocation Resolver
 */
@Resolver(() => Allocation)
export class AllocationResolver {
  /**
   * Constructor for allocation resolver
   * @param allocationService Injected service for resolver
   */
  constructor(private allocationService: AllocationService) {}

  /**
   * Creates an allocation
   * @param createAllocationInput Input
   * @returns Allocation created
   */
  @Mutation(() => Allocation)
  createAllocation(
    @Args('createAllocationInput') createAllocationInput: CreateAllocationInput,
  ): Promise<Allocation> {
    return this.allocationService.createAllocation(createAllocationInput);
  }

  /**
   * Gets all allocations related to a Customer
   * @param getAllocationsInput Input
   * @returns Collection of allocations
   */
  @Query(() => [Allocation])
  allocations(
    @Args('getAllocationsInput') getAllocationsInput: GetAllocationsInput,
  ): Promise<Allocation[]> {
    return this.allocationService.getAllocations(getAllocationsInput);
  }

  /**
   * Updates an allocations
   * @param getAllocationsInput Input
   * @returns Updated allocation
   */
  @Mutation(() => Allocation)
  updateAllocation(
    @Args('updateAllocationInput') updateAllocationInput: UpdateAllocationInput,
  ): Promise<Allocation> {
    return this.allocationService.updateAllocation(updateAllocationInput);
  }

  /**
   * Deletes an allocation
   * @param getAllocationsInput Input
   * @returns True if deletion was sucessfull
   */
  @Mutation(() => Boolean)
  deleteAllocation(
    @Args('deleteAllocationInput') deleteAllocationInput: DeleteAllocationInput,
  ): Promise<boolean> {
    return this.allocationService.deleteAllocation(deleteAllocationInput);
  }

  /**
   * Sum all allocations amounts of a Customer
   * @param getAllocationsInput Input
   * @returns Sum of allocations amounts
   */
  @Query(() => Number)
  allocationsTotalAmount(
    @Args('sumAllocationsInput') getAllocationsInput: GetAllocationsInput,
  ): Promise<number> {
    return this.allocationService.getAllocationsTotalAmount(
      getAllocationsInput,
    );
  }

  /**
   * Gets customer related to an allocation
   * @param allocation Allocation
   * @returns Customer
   */
  @ResolveField(() => Customer)
  customer(@Parent() allocation: Allocation): Promise<Customer> {
    return this.allocationService.getCustomer(allocation.customerId);
  }
}
