import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Allocation } from 'allocation/allocation.entity';

/**
 * Customer Entity
 */
@ObjectType()
@Entity()
@Index(['username'], { unique: true })
export class Customer {
  /**
   * Customer ID
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * Customer username
   */
  @Column()
  @Field()
  username: string;

  /**
   * Allocations associated with Customer
   */
  @OneToMany(() => Allocation, (allocation) => allocation.customer)
  @Field(() => [Allocation], { nullable: true })
  allocations?: Allocation[];
}
