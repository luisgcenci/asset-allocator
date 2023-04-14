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
@Entity('asset_class')
@Index(['name', 'customerId'], { unique: true })
export class AssetClass {
  /**
   * Asset Class ID
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * Asset Class Name
   */
  @Column()
  @Field()
  name: string;

  /**
   * Asset Class Amount
   */
  @Column()
  @Field(() => Int)
  amount: number;

  /**
   * Asset Class Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Column()
  @Field(() => Int, { nullable: true })
  customerId: number;

  /**
   * Customer associated with Asset Class
   */
  @ManyToOne(() => Customer, (customer) => customer.assetClasses)
  @Field(() => Customer, { nullable: true })
  customer: Customer;
}
