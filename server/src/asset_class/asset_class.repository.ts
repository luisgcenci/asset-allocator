import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AssetClass } from './asset_class.entity';
import {
  CreateAssetClassInput,
  DeleteAssetClassInput,
  GetAssetClassInput,
  GetAssetClassesInput,
  UpdateAssetClassInput,
} from './dto/asset_class.dto';

/**
 * Asset Class Repository
 */
@Injectable()
export class AssetClassRepository {
  private repository: Repository<AssetClass>;

  /**
   * Constructor for Asset Class Repository
   * @param dataSource Data source injected
   */
  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(AssetClass);
  }

  /**
   * Creates an asset class in the database
   * @param createAssetClassInput Input
   * @returns Asset Class created
   */
  create(createAssetClassInput: CreateAssetClassInput): AssetClass {
    return this.repository.create(createAssetClassInput);
  }

  /**
   * Saves an asset class in the database
   * @param assetClass Asset Class
   * @returns Allocation saved
   */
  async save(assetClass: AssetClass): Promise<AssetClass> {
    return await this.repository.save(assetClass);
  }

  /**
   * Finds all asset classes in the database
   * @param getAssetClassesInput Input
   * @returns A collection of asset classes found
   */
  async find(
    getAssetClassesInput: GetAssetClassesInput,
  ): Promise<AssetClass[]> {
    return await this.repository.findBy(getAssetClassesInput);
  }

  /**
   * Finds a single asset class in the database
   * @param getAssetClassInput Input
   * @returns Asset Class found or null
   */
  async findOne(getAssetClassInput: GetAssetClassInput): Promise<AssetClass> {
    return await this.repository.findOneBy(getAssetClassInput);
  }

  /**
   * Updates an asset class in the database
   * @param updateAssetClassInput Input
   * @returns void
   */
  async update(updateAssetClassInput: UpdateAssetClassInput) {
    await this.repository.update(
      {
        id: updateAssetClassInput.id,
        customerId: updateAssetClassInput.customerId,
      },
      updateAssetClassInput,
    );
  }

  /**
   * Deletes an allocation in the database
   * @param deleteAssetClassInput Input
   * @returns void
   */
  async delete(deleteAssetClassInput: DeleteAssetClassInput) {
    await this.repository.delete(deleteAssetClassInput);
  }
}
