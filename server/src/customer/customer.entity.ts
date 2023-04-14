import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { AssetClass } from 'asset_class/asset_class.entity';

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
  @OneToMany(() => AssetClass, (assetClass) => assetClass.customer)
  @Field(() => [AssetClass], { nullable: true })
  assetClasses?: AssetClass[];
}
