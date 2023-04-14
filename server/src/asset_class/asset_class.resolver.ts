import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Customer } from 'customer/customer.entity';
import { AssetClass } from './asset_class.entity';
import { AssetClassService } from './asset_class.service';
import {
  CalculateInput,
  CreateAssetClassInput,
  DeleteAssetClassInput,
  GetAssetClassesInput,
  UpdateAssetClassInput,
} from './dto/asset_class.dto';

/**
 * Asset Class Resolver
 */
@Resolver(() => AssetClass)
export class AssetClassResolver {
  /**
   * Constructor for asset class resolver
   * @param assetClassService Injected service for resolver
   */
  constructor(private assetClassService: AssetClassService) {}

  /**
   * Creates an asset class
   * @param createAssetClassInput Input
   * @returns Asset Class created
   */
  @Mutation(() => AssetClass)
  createAssetClass(
    @Args('createAssetClassInput') createAssetClassInput: CreateAssetClassInput,
  ): Promise<AssetClass> {
    return this.assetClassService.createAssetClass(createAssetClassInput);
  }

  /**
   * Gets all asset classes related to a Customer
   * @param getAssetClassesInput Input
   * @returns Collection of asset classes
   */
  @Query(() => [AssetClass])
  assetClasses(
    @Args('getAssetClassesInput') getAssetClassesInput: GetAssetClassesInput,
  ): Promise<AssetClass[]> {
    return this.assetClassService.getAssetClasses(getAssetClassesInput);
  }

  /**
   * Updates an Asset Class
   * @param updateAssetClassInput Input
   * @returns Updated Asset Class
   */
  @Mutation(() => AssetClass)
  updateAssetClass(
    @Args('updateAssetClassInput') updateAssetClassInput: UpdateAssetClassInput,
  ): Promise<AssetClass> {
    return this.assetClassService.updateAssetClass(updateAssetClassInput);
  }

  /**
   * Deletes an asset class
   * @param getAllocationsInput Input
   * @returns True if deletion was sucessfull
   */
  @Mutation(() => Boolean)
  deleteAssetClass(
    @Args('deleteAssetClassInput') deleteAssetClassInput: DeleteAssetClassInput,
  ): Promise<boolean> {
    return this.assetClassService.deleteAssetClass(deleteAssetClassInput);
  }

  /**
   * Sum all asset classes amounts of a Customer
   * @param getAssetClassesInput Input
   * @returns Sum of asset classes amounts
   */
  @Query(() => Number)
  assetClassesTotalAmount(
    @Args('sumAssetClassesInput') getAssetClassesInput: GetAssetClassesInput,
  ): Promise<number> {
    return this.assetClassService.getAssetClassesTotalAmount(
      getAssetClassesInput,
    );
  }

  /**
   * Gets customer related to an asset class
   * @param assetClass Asset Class
   * @returns Customer
   */
  @ResolveField(() => Customer)
  customer(@Parent() assetClass: AssetClass): Promise<Customer> {
    return this.assetClassService.getCustomer(assetClass.customerId);
  }

  /**
   * Gets a simulation of where a new investment amount should be allocate to
   * based on customer current asset classes and targets set for each
   * @param calculateInput Input
   * @returns A list of something
   */
  @Mutation(() => [AssetClass])
  async SimulateNewAllocations(
    calculateInput: CalculateInput,
  ): Promise<AssetClass[]> {
    return [new AssetClass()];
  }
}
