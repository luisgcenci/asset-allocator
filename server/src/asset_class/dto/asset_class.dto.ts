import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

/**
 * Input for creating Asset Class
 */
@InputType()
export class CreateAssetClassInput {
  /**
   * Asset Class Name
   */
  @Field()
  name: string;

  /**
   * Asset Class Amount
   */
  @Field(() => Int)
  amount: number;

  /**
   * Asset Class Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field()
  target: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for getting collection of Asset Classs
 */
@InputType()
export class GetAssetClassesInput {
  /**
   * Asset Class Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Asset Class Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Asset Class Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;

  /**
   * Customer ID associated with Asset Classs
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for getting specific Asset Class
 */
@InputType()
export class GetAssetClassInput {
  /**
   * Asset Class ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;

  /**
   * Asset Class Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Asset Class Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Asset Class Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;
}

/**
 * Input for updating specific Asset Class
 */
@InputType()
export class UpdateAssetClassInput {
  /**
   * Asset Class ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;

  /**
   * Asset Class Name
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Asset Class Amount
   */
  @Field(() => Int, { nullable: true })
  amount?: number;

  /**
   * Asset Class Target Percentage
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @Field({ nullable: true })
  target?: number;
}

/**
 * Input for deleting specific Asset Class
 */
@InputType()
export class DeleteAssetClassInput {
  /**
   * Asset Class ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for checking if specific Asset Class exists
 */
@InputType()
export class AssetClassExistsInput {
  /**
   * Asset Class ID
   */
  @Field(() => Int)
  id: number;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;
}

/**
 * Input for checking if Asset Class name exists
 */
@InputType()
export class AssetClassNameExistsInput {
  /**
   * Asset Class Name
   */
  @Field()
  name: string;

  /**
   * Customer ID associated with Asset Class
   */
  @Field(() => Int)
  customerId: number;
}

@InputType()
export class CalculateInput {
  /**
   * Customer ID associated with Asset Classs
   */
  @Field(() => Int)
  customerId: number;

  /**
   * New Investment Amount
   */
  @Field(() => Int)
  amount: number;
}
