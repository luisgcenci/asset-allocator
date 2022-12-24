import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Input for creating Customer
 */
@InputType()
export class CreateCustomerInput {
  /**
   * Customer username
   */
  @Field()
  username: string;
}

/**
 * Input for getting a Customer
 */
@InputType()
export class GetCustomerInput {
  /**
   * Customer ID
   */
  @Field(() => Int, { nullable: true })
  id: number;
}

/**
 * Input for getting a Customer by username
 */
@InputType()
export class GetCustomerByUsernameInput {
  /**
   * Customer username
   */
  @Field()
  username: string;
}
