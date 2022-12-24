import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Customer } from '../customer/customer.entity';

/**
 * Allocation Entity
 */
@ObjectType()
@Entity('allocation')
@Index(['name', 'customerId'], { unique: true })
export class Allocation {
  /**
   * Allocation ID
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * Allocation Name
   */
  @Column()
  @Field()
  name: string;

  /**
   * Allocation Amount
   */
  @Column()
  @Field(() => Int)
  amount: number;

  /**
   * Allocation Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target: number;

  /**
   * Customer ID associated with Allocation
   */
  @Column()
  @Field(() => Int, { nullable: true })
  customerId: number;

  /**
   * Customer associated with Allocation
   */
  @ManyToOne(() => Customer, (customer) => customer.allocations)
  @Field(() => Customer, { nullable: true })
  customer: Customer;
}
