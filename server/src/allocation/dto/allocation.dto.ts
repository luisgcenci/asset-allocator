import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

/**
 * Input for creating Allocation
 */
@InputType()
export class CreateAllocationInput {
  /**
   * Allocation Name
   */
  @Field()
  name: string;

  /**
   * Allocation Amount
   */
  @Field(() => Int)
  amount: number;

  /**
   * Allocation Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field()
  target: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for getting collection of allocations
 */
@InputType()
export class GetAllocationsInput {
  /**
   * Allocation Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Allocation Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Allocation Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for getting specific allocation
 */
@InputType()
export class GetAllocationInput {
  /**
   * Allocation ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;

  /**
   * Allocation Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Allocation Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Allocation Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;
}

/**
 * Input for updating specific allocation
 */
@InputType()
export class UpdateAllocationInput {
  /**
   * Allocation ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;

  /**
   * Allocation Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Allocation Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Allocation Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;
}

/**
 * Input for deleting specific allocation
 */
@InputType()
export class DeleteAllocationInput {
  /**
   * Allocation ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for checking if specific allocation exists
 */
@InputType()
export class AllocationExistsInput {
  /**
   * Allocation ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for checking if allocation name exists
 */
@InputType()
export class AllocationNameExistsInput {
  /**
   * Allocation Name
   */
  @Field()
  name: string;

  /**
   * Customer ID associated with Allocation
   */
  @Field(() => Int)
  customerId: number;
}
